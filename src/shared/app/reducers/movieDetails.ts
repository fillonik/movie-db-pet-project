import { AnyAction } from 'redux';
import { IStore } from '../../../typings';
import { API_GET_MOVIE_DETAILS_SUCCESS, IMovieDetail } from '../../api/getMovieApi';

export function MovieDetailsReducer(movieDetails: IMovieDetail | null = null, actions: AnyAction) {
    if (actions.type === API_GET_MOVIE_DETAILS_SUCCESS) {
       console.warn(actions.payload);

       return actions.payload;
    }

    return movieDetails;
}

export function movieDetailsSelector(store: IStore): IMovieDetail | undefined {
    return store.movieDetails;
}
