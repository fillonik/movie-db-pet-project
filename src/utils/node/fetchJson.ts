import * as http from 'http';
import * as https from 'https';
import { IApiSettings } from '../../shared/api';
import { parseJson } from '../parseJson';

export function fetchJson<T>(model: IApiSettings): Promise<T> {
    return new Promise((resolve, reject) => {
        const client = model.protocol === 'https' ? https.request : http.request;
        const req = client({
            hostname: model.hostname,
            method: model.method,
            path: model.path,
        }, (response) => {
            let chunks: Array<Uint8Array> = [];

            response.on('data', (chunk) => {
                chunks.push(chunk);
            });

            response.on('end', () => {
                const str = Buffer.concat(chunks);

                if (response.statusCode) {
                    resolve(parseJson(str.toString()));
                } else if (response.statusCode === 200) {
                    resolve(parseJson(str.toString()));
                } else {
                    reject(parseJson(str.toString()));
                }
            });
        });

        if (model.data) {
            req.write(model.data);
        }

        req.end();
    });
}
