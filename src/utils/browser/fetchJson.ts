import { IApiSettings } from '../../shared/api/ApiModel';
import { parseJson } from '../parseJson';

export function fetchJson<T>(model: IApiSettings): Promise<T> {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        const url = `${model.protocol}://${model.hostname}${model.path}`;

        req.ontimeout = () => {
            reject({status: 499});
        };

        req.onerror = () => {
            reject(parseJson(req.responseText));
        };

        req.onreadystatechange = () => {
            if (req.readyState !== 4) {
                return;
            }

            if (req.status === 200) {
                resolve(parseJson(req.responseText));
            }
        };

        req.open(model.method, url, true);

        req.timeout = 10000;
        req.send(model.data);
    });
}
