import * as fs from 'fs';
import { parseJson } from './parseJson';

export interface IManifestFile {
    'main.js': string;
    [index: string]: string | undefined;
}

export class Manifest {
    public data: IManifestFile;
    private filePath: string;

    public constructor(path: string) {
        this.filePath = path;
    }

    public load() {
        if (!this.filePath) {
            return Promise.reject(new Error('Manifest path not found in config'));
        }

        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const conf = parseJson(data);
                    this.data = conf;

                    resolve();
                }
            });
        });
    }
}
