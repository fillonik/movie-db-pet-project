import * as express from 'express';
import * as React from 'react';
import { ROUTES } from '../shared/routes';
import { createMainPage } from './pages';

async function createServer() {
    const port = 3000;
    const server = express();

    server.get(ROUTES.MAIN, createMainPage);
    server.get(ROUTES.FIND, createMainPage);

    const serveStatic = require('serve-static');
    server.use('/assets', serveStatic(`./dist/assets/`));

    server.listen(port);

    console.warn(`server starts on ${port}`);
}

createServer();
