import { AnyAction } from 'redux';
import { IStore } from '../../../typings';
import { API_SEARCH_MOVIE_SUCCESS, IMovie } from '../../api/searchMovieApi';

export function MoviesListReducer(moviesList: IMovie[] = [], actions: AnyAction) {
    if (actions.type === API_SEARCH_MOVIE_SUCCESS) {
       return actions.payload.page === 1 ? [...actions.payload.results] : [...moviesList, ...actions.payload.results];
    }

    return moviesList;
}

export function filteredMoviesListSelector(store: IStore): IMovie[] {
    const moviesByGenre = store.filterForm ?
        filteredMoviesByGenre(store.moviesList, store.filterForm.genre) :
        store.moviesList;
    const moviesByYear = store.filterForm ?
        filteredMoviesByYear(moviesByGenre, store.filterForm.year) :
        store.moviesList;

    return store.filterForm ? filteredMoviesByRating(moviesByYear, store.filterForm.rating) : store.moviesList;
}

export function filteredMoviesByGenre(movies: IMovie[], genre?: number): IMovie[] {
    return genre ? movies.filter(movie =>
        movie.genre_ids.indexOf(genre) !== -1) : movies;
}

export function filteredMoviesByRating(movies: IMovie[], rating?: number): IMovie[] {
    return rating ? movies.filter(movie => movie.vote_average >= rating) : movies;
}

export function filteredMoviesByYear(movies: IMovie[], year?: number): IMovie[] {
    return year ? movies.filter(movie => (new Date(movie.release_date)).getFullYear() === year) : movies;
}
