import { AnyAction } from 'redux';
import { IStore } from '../../../typings';
import { IGenre } from '../../api/genresApi';

export function GenresReducer(genres: IGenre[] = [], actions: AnyAction) {
    return [...genres];
}

export function genresSelector(store: IStore): IGenre[] {
    return store.genres || [];
}
