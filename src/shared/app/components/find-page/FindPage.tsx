import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../../../typings';
import { IConfiguration } from '../../../api/configurationApi';
import { getMovieDetailsApi, IMovieDetail } from '../../../api/getMovieApi';
import { IMovie, ISearchMovieParams, searchMovieApi } from '../../../api/searchMovieApi';
import { configurationSelector } from '../../reducers/configuration';
import {  filterQuerySelector, filterYearSelector } from '../../reducers/filterForm';
import { movieDetailsSelector } from '../../reducers/movieDetails';
import { filteredMoviesListSelector } from '../../reducers/moviesList';
import { pageSelector, totalPagesSelector } from '../../reducers/pageStatus';
import { IApiAction } from '../../store/apiMiddleware';
import { FilterFormContainer } from '../filter-form/FilterForm';
import { Loader } from '../loader/Loader';
import { MovieDetails } from '../movie-details/MovieDetails';
import { MovieList } from '../movie-list/MovieList';
import * as styles from './index.css';

export interface IFindPageStateToProps {
    configuration: IConfiguration;
    filterYear?: number;
    filterQuery: string;
    movies: IMovie[];
    movieDetails?: IMovieDetail;
    page: number;
    totalPages: number;
}

export interface IFindPageDispatchToProps {
    getMovieDetails(movieId: number): IApiAction;
    searchMovie(params: ISearchMovieParams): IApiAction;
}

export interface IFindPageProps {

}

export interface IFindPageState {
    loading: boolean;
}

export class FindPage extends React.Component<IFindPageDispatchToProps &
    IFindPageStateToProps &
    IFindPageProps, IFindPageState> {
    private scrollOffset = 100;
    private refResults = React.createRef<HTMLDivElement>();

    public constructor(props: IFindPageDispatchToProps & IFindPageStateToProps & IFindPageProps) {
        super(props);

        this.state = {loading: false};

        this.find = this.find.bind(this);
        this.getMovieDetails = this.getMovieDetails.bind(this);
    }

    public componentDidMount(): void {
        if (this.props.filterQuery !== '') {
            this.find();
        }

        const listElement = this.refResults.current;

        if (listElement) {
            listElement.addEventListener('scroll', this.onScrollEvent.bind(this), false);
        }
    }

    public componentWillUnmount(): void {
        const listElement = this.refResults.current;

        if (listElement) {
            listElement.removeEventListener('scroll', this.onScrollEvent.bind(this), false);
        }
    }

    public onScroll(event: React.SyntheticEvent) {
        const target = event.target as HTMLElement;
        if (!this.state.loading &&
            this.props.page < this.props.totalPages &&
            (target.scrollHeight - this.scrollOffset <= target.scrollTop + target.clientHeight)) {
            this.setState({
                loading: true,
            });

            this.find(this.props.page + 1);
        }
    }

    public onScrollEvent(event: React.SyntheticEvent) {
        if (event && event.persist) {
            event.persist();
        }
        this.onScroll(event);
    }

    public render() {
        const selectedMovie = this.props.movieDetails ? this.props.movieDetails.id : undefined;

        return <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.header}>
                    <FilterFormContainer onFindHandler={this.find} />
                </div>
                <div className={styles.resultsContainer} ref={this.refResults}>
                    <MovieList movies={this.props.movies}
                               selectedMovie={selectedMovie}
                               onMovieClick={this.getMovieDetails} />
                    {this.state.loading && <Loader />}
                </div>
            </div>
            {this.props.movieDetails && <div className={styles.rightSide}>
               <MovieDetails movie={this.props.movieDetails} configuration={this.props.configuration} />
            </div>}
        </div>;
    }

    private find(page: number = 1) {
        this.props.searchMovie({query: this.props.filterQuery, page})
    .then(() => {
        this.setState({loading: false});
    });
    }

    private getMovieDetails(movieId: number) {
        this.props.getMovieDetails(movieId);
    }
}

const mapStateToProps = (state: IStore): IFindPageStateToProps => ({
    configuration: configurationSelector(state),
    filterQuery: filterQuerySelector(state),
    filterYear: filterYearSelector(state),
    movieDetails: movieDetailsSelector(state),
    movies: filteredMoviesListSelector(state),
    page: pageSelector(state),
    totalPages: totalPagesSelector(state),
});

const mapDispatchToProps: IFindPageDispatchToProps = {
    getMovieDetails: getMovieDetailsApi,
    searchMovie: searchMovieApi,
};

export const FindPageContainer = connect<
    IFindPageStateToProps,
    IFindPageDispatchToProps,
    IFindPageProps,
    IStore>(
    mapStateToProps,
    mapDispatchToProps,
)(FindPage);
