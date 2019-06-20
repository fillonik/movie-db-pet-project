import { AnyAction, Middleware } from 'redux';
import { fetchJson } from '../../../utils/browser/fetchJson';
import { IApiSettings } from '../../api/ApiModel';

export const API_DEFAULT_ERROR = 'API_ERROR';
export const API_DEFAULT_SUCCESS = 'API_SUCCESS';

export interface IApiMeta {
  request: IApiSettings; //настройки для запроса
  args?: object;
}

export interface IApiAction extends AnyAction {
  actions: string[];
  meta: IApiMeta;
}

export function apiMiddleware(): Middleware {
  return ({ dispatch }) => next => (action: IApiAction) => {
    if (!action.meta || !action.meta.request) {
      return next(action);
    }

    const { request } = action.meta;

    const [SUCCESS = API_DEFAULT_SUCCESS, ERROR = API_DEFAULT_ERROR] = action.actions;

    next(action);

    return fetchJson(request).then(
      response => {
        dispatch({
          ...action.meta,
          payload: response,
          type: SUCCESS,
        });

        return response;
      },
      error => {
        dispatch({
          ...action.meta,
          payload: error && error.response,
          type: ERROR,
        });

        return Promise.reject(error);
      },
    );
  };
}
