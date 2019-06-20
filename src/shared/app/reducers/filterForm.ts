import { AnyAction } from 'redux';
import { IStore } from '../../../typings';
import { IFilterForm } from '../components/filter-form/FilterForm';

export const SET_FILTER = 'SET_FILTER';

const initialState: IFilterForm = {
    query: '',
};

export function FilterFormReducer(filterForm: IFilterForm = initialState, actions: AnyAction) {
    if (actions.type === SET_FILTER) {
        return {...filterForm, ...actions.params};
    }

    return filterForm;
}

export function setFilterAction(params: Partial<IFilterForm>): AnyAction {
    return {
        params,
        type: SET_FILTER,
    };
}

export function filterFormSelector(store: IStore): IFilterForm | undefined {
    return store.filterForm;
}

export function filterQuerySelector(store: IStore): string {
    return store.filterForm && store.filterForm.query || '';
}

export function filterGenreSelector(store: IStore): number | undefined {
    return store.filterForm && store.filterForm.genre || undefined;
}

export function filterYearSelector(store: IStore): number | undefined {
    return store.filterForm && store.filterForm.year || undefined;
}

export function filterRatingSelector(store: IStore): number | undefined {
    return store.filterForm && store.filterForm.rating || undefined;
}
