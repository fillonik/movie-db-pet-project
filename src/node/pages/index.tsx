import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ApiModel } from '../../shared/api/ApiModel';
import { configurationApi, IConfiguration } from '../../shared/api/configurationApi';
import { genresApi, IGenresApi } from '../../shared/api/genresApi';
import { ServerApp } from '../../shared/app';
import { IStore } from '../../typings';
import { Manifest } from '../../utils/manifest';
import { composeScript } from '../../utils/node/composeScript';
import { fetchJson } from '../../utils/node/fetchJson';
import { pageTemplate } from '../template';

export async function createMainPage(req: express.Request, res: express.Response) {
    const manifest = new Manifest('./dist/assets/manifest.json');
    await manifest.load();

    const scripts = composeScript('./assets' + manifest.data['main.js']);

    const genresModel = new ApiModel<IGenresApi>({fetch: fetchJson}, genresApi);
    const genres = await genresModel.fetch();

    const configurationModel = new ApiModel<IConfiguration>({fetch: fetchJson}, configurationApi);
    const configuration = await configurationModel.fetch();

    const store: IStore = {genres: genres.genres, moviesList: [], configuration, pageStatus: {page: 0, totalPages: 0}};

    const body = renderToString(<ServerApp url={req.url} store={store}/>);
    const title = 'MovieDB viewer';

    res.send(
        pageTemplate({
            body,
            scripts,
            title,
        }, store),
    );
}
