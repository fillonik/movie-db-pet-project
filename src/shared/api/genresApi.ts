import { API_HOST, API_KEY, IApiSettings } from './ApiModel';

export interface IGenre {
    id: number;
    name: string;
}

export interface IGenresApi {
    genres: IGenre[];
}

export const genresApi: IApiSettings = {
    hostname: API_HOST,
    method: 'GET',
    path: `/3/genre/movie/list?api_key=${API_KEY}&language=ru-Ru`,
    protocol: 'https',
};
