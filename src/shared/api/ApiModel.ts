export const API_HOST = 'api.themoviedb.org';
export const API_KEY = '174bfdbd3ae257ea296a3f905b011eba';

export interface IApiSettings {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    hostname: string;
    path: string;
    protocol: 'http' | 'https';
    // tslint:disable-next-line:no-any
    data?: any;
}

export interface IFetch<T> {
    fetch(model: IApiSettings): Promise<T>;
}

export class ApiModel<T> {
    private fetchMethod: IFetch<T>;
    private model: IApiSettings;

    public constructor(fetch: IFetch<T>, model: IApiSettings) {
        this.fetchMethod = fetch;
        this.model = model;
    }

    public fetch() {
        return this.fetchMethod.fetch(this.model);
    }
}
