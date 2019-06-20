import { IConfiguration } from '../shared/api/configurationApi';
import { IGenre } from '../shared/api/genresApi';
import { IMovieDetail } from '../shared/api/getMovieApi';
import { IMovie } from '../shared/api/searchMovieApi';
import { IFilterForm } from '../shared/app/components/filter-form/FilterForm';
import { IPageStatus } from '../shared/app/reducers/pageStatus';

export interface IPage {
    title: string;
    body: string;
    scripts: string;
}

export interface IStore {
    configuration: IConfiguration | null;
    genres: IGenre[];
    filterForm?: IFilterForm;
    moviesList: IMovie[];
    movieDetails?: IMovieDetail;
    pageStatus: IPageStatus;
}

interface IWindow extends Window {__store__?: IStore; __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?<R>(a: R): R; }
