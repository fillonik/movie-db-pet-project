import * as React from 'react';
import { ReactElement } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { AnyAction } from 'redux';
import { IStore } from '../../../../typings';
import { IGenre } from '../../../api/genresApi';
import { ISearchMovieParams, searchMovieApi } from '../../../api/searchMovieApi';
import {
    filterGenreSelector,
    filterQuerySelector,
    filterRatingSelector,
    filterYearSelector,
    setFilterAction,
} from '../../reducers/filterForm';
import { genresSelector } from '../../reducers/genres';
import { Stars } from '../stars/Stars';
import * as styles from './index.css';

const START_YEAR = 1950;
const MAX_RATING = 10;

export interface IFilterForm {
    query: string;
    genre?: number;
    year?: number;
    rating?: number;
}

export interface IFilterFormStateToProps {
    filterGenre?: number;
    filterRating?: number;
    filterYear?: number;
    filterQuery: string;
    genres: IGenre[];
}

export interface IFilterFormDispatchToProps {
    searchMovie(params: ISearchMovieParams): AnyAction;
    setFilter(params: Partial<IFilterForm>): AnyAction;
}

export interface IFilterFormProps {
    onFindHandler(): void;
}

export interface IFilterFormState {
    queryError: boolean;
}

export class FilterForm extends React.Component<
    IFilterFormProps &
    IFilterFormStateToProps &
    IFilterFormDispatchToProps, IFilterFormState> {
    public constructor(props: IFilterFormProps &
        IFilterFormStateToProps &
        IFilterFormDispatchToProps) {
        super(props);

        this.state = {queryError: false};

        this.findClickHanler = this.findClickHanler.bind(this);
        this.updateQueryHandler = this.updateQueryHandler.bind(this);
        this.updateGenreHandler = this.updateGenreHandler.bind(this);
        this.updateYearHandler = this.updateYearHandler.bind(this);
        this.updateRatingHandler = this.updateRatingHandler.bind(this);
    }

    public findClickHanler() {
        this.setState({queryError: this.props.filterQuery.trim() === ''}, () => {
            if (!this.state.queryError) {
                this.props.onFindHandler();
            }
        });
    }

    public render() {
        return <div className={styles.formContainer}>
            <input type={'text'}
                   className={`${styles.filmNameField} ${this.state.queryError ? styles.fieldError : undefined}`}
                   value={this.props.filterQuery}
                   placeholder={'Введите название фильма'}
                   onChange={this.updateQueryHandler}
            />
            <div className={styles.filtersContainer}>
                <Select isClearable={true}
                        onChange={this.updateGenreHandler}
                        placeholder={'Жанр'}
                        options={this.getGenresOptions()}
                        value={this.getSelectedGenre(this.props.filterGenre)}
                />
                <Select isClearable={true}
                        onChange={this.updateYearHandler}
                        placeholder={'Год'}
                        options={this.getYearsOptions()}
                        value={this.getSelectedYear(this.props.filterYear)}/>
                <Select isClearable={true}
                        onChange={this.updateRatingHandler}
                        placeholder={'Рейтинг'}
                        isSearchable={false}
                        options={this.getRatingOptions()}
                        value={this.getSelectedRating(this.props.filterRating)}/>
                <button onClick={this.findClickHanler}>Искать</button>
            </div>
        </div>;
    }

    private getGenresOptions() {
        return this.props.genres
            .map(genre => ({value: genre.id, label: genre.name}));
    }

    private getSelectedGenre(selected?: number) {
        return selected ?
            this.getGenresOptions().find(genre => genre.value === selected) :
            undefined;
    }

    private getRatingOptions() {
        let rating = MAX_RATING;
        let ratingArr: number[] = [];

        while (rating >= 1) {
            ratingArr.push(rating--);
        }

        return ratingArr.map((r: number) =>
            ({value: r, label: <Stars total={MAX_RATING} selected={r} />}));
    }

    private getSelectedRating(selected?: number) {
        return selected ?
            this.getRatingOptions().find((rating) => rating.value === selected) :
            undefined;
    }

    private getYearsOptions() {
        let year = (new Date()).getFullYear();
        let yearsArr = [];

        while (year >= START_YEAR) {
            yearsArr.push(year--);
        }

        return yearsArr.map((y: number) =>
            ({value: y, label: y.toString()}));
    }

    private getSelectedYear(selected?: number) {
        return selected ?
            this.getYearsOptions().find((year) => year.value === selected) :
            undefined;
    }

    private updateQueryHandler(e: React.SyntheticEvent<HTMLInputElement>) {
        this.props.setFilter({query: e.currentTarget.value});
    }

    private updateGenreHandler(option: {value: number, label: string} | null) {
        this.props.setFilter({genre: option ? option.value : undefined});
    }

    private updateRatingHandler(option: {value: number, label: ReactElement} | null) {
        this.props.setFilter({rating: option ? option.value : undefined});
    }

    private updateYearHandler(option: {value: number, label: string} | null) {
        this.props.setFilter({year: option ? option.value : undefined});
    }
}

const mapStateToProps = (state: IStore): IFilterFormStateToProps => ({
    filterGenre: filterGenreSelector(state),
    filterQuery: filterQuerySelector(state),
    filterRating: filterRatingSelector(state),
    filterYear: filterYearSelector(state),
    genres: genresSelector(state),
});

const mapDispatchToProps: IFilterFormDispatchToProps = {
    searchMovie: searchMovieApi,
    setFilter: setFilterAction,
};

export const FilterFormContainer = connect<
    IFilterFormStateToProps,
    IFilterFormDispatchToProps,
    IFilterFormProps,
    IStore>(
    mapStateToProps,
    mapDispatchToProps,
)(FilterForm);
