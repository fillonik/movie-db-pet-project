import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { IStore } from '../../../typings';
import { ConfigurationReducer } from '../reducers/configuration';
import { FilterFormReducer } from '../reducers/filterForm';
import { GenresReducer } from '../reducers/genres';
import { MovieDetailsReducer } from '../reducers/movieDetails';
import { MoviesListReducer } from '../reducers/moviesList';
import { PageStatusReducer } from '../reducers/pageStatus';
import { apiMiddleware } from './apiMiddleware';

export const store = (data: object, reduxDevtool?: <R>(a: R) => R) => {
    const composeEnhancers = reduxDevtool || compose;

    return createStore(
        combineReducers<IStore>({
            configuration: ConfigurationReducer,
            filterForm: FilterFormReducer,
            genres: GenresReducer,
            movieDetails: MovieDetailsReducer,
            moviesList: MoviesListReducer,
            pageStatus: PageStatusReducer,
        }),
        data || {},
        composeEnhancers(
            applyMiddleware(apiMiddleware()),
        ),
    );
};
