import { IApiAction } from '../app/store/apiMiddleware';
import { API_HOST, API_KEY, IApiSettings } from './ApiModel';
import { IGenre } from './genresApi';

export const API_GET_MOVIE_DETAILS_SUCCESS = 'API_GET_MOVIE_DETAILS_SUCCESS';
export const API_GET_MOVIE_DETAILS_FAIL = 'API_GET_MOVIE_DETAILS_FAIL';
export const API_GET_MOVIE_DETAILS = 'API_GET_MOVIE_DETAILS';

export interface IMovieDetail {
    adult: boolean;
    backdrop_path?: string;
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: string;
    revenue: number;
    runtime: number;
    title: string;
    vote_average: number;
    tagline?: string;
}

export const getMovieDetailsApiModel = (movieId: number): IApiSettings =>
    ({
        hostname: API_HOST,
        method: 'GET',
        path: `/3/movie/${movieId}?api_key=${API_KEY}&language=ru-Ru`,
        protocol: 'https',
    });

export function getMovieDetailsApi(movieId: number): IApiAction {
    const request = getMovieDetailsApiModel(movieId);

    return {
        actions: [API_GET_MOVIE_DETAILS_SUCCESS, API_GET_MOVIE_DETAILS_FAIL],
        meta: {
            request,
        },
        type: API_GET_MOVIE_DETAILS,
    };
}
