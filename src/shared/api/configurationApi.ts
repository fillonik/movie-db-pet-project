import { API_HOST, API_KEY, IApiSettings } from './ApiModel';

export interface IConfiguration {
    images: {
        base_url: string;
        secure_base_url: string;
        backdrop_sizes: string[];
        logo_sizes: string[];
        poster_sizes: string[];
        profile_sizes: string[];
        still_sizes: string[];
    };
    change_keys: string[];
}

export const configurationApi: IApiSettings = {
    hostname: API_HOST,
    method: 'GET',
    path: `/3/configuration?api_key=${API_KEY}`,
    protocol: 'https',
};
