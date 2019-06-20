import { IApiAction } from '../app/store/apiMiddleware';
import { API_HOST, API_KEY, IApiSettings } from './ApiModel';

export const API_SEARCH_MOVIE_SUCCESS = 'API_SEARCH_MOVIE_SUCCESS';
export const API_SEARCH_MOVIE_FAIL = 'API_SEARCH_MOVIE_FAIL';
export const API_SEARCH_MOVIE = 'API_SEARCH_MOVIE';

export interface ISearchMovieParams {
    query: string; year?: number;
    page?: number;
}

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IMovieApi {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export const searchMovieApiModel = (params: ISearchMovieParams): IApiSettings => {
    const page = params.page ? `&page=${params.page}` : '&page=1';

    return {
        hostname: API_HOST,
        method: 'GET',
        path: `/3/search/movie?api_key=${API_KEY}&language=ru-Ru&query=${encodeURIComponent(params.query)}${page}`,
        protocol: 'https',
    };
};

export function searchMovieApi(params: ISearchMovieParams): IApiAction {
    const request = searchMovieApiModel(params);

    return {
        actions: [API_SEARCH_MOVIE_SUCCESS, API_SEARCH_MOVIE_FAIL],
        meta: {
            request,
        },
        type: API_SEARCH_MOVIE,
    };
}
