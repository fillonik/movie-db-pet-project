import { AnyAction } from 'redux';
import { IStore } from '../../../typings';
import { API_SEARCH_MOVIE_SUCCESS } from '../../api/searchMovieApi';

export interface IPageStatus {
    page: number;
    totalPages: number;
}

export function PageStatusReducer(pageStatus: IPageStatus = {page: 0, totalPages: 0}, actions: AnyAction) {
    if (actions.type === API_SEARCH_MOVIE_SUCCESS) {
        return {page: actions.payload.page, totalPages: actions.payload.total_pages};
    }

    return {...pageStatus};
}

export function pageSelector(store: IStore): number {
    return store.pageStatus.page || 0;
}

export function totalPagesSelector(store: IStore): number {
    return store.pageStatus.totalPages || 0;
}
