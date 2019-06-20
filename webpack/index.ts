import * as express from 'express';
import * as rimraf from 'rimraf';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import { clientDevConfig } from './config/browser/dev';
import { serverConfig } from './config/node';
import * as util from './utils';
const path = require('path');

const browserEntry = './src/browser/index.tsx';

export async function webpackDevProcess () {
    rimraf.sync('./dist');

    const compiler = webpack(clientDevConfig(browserEntry) as webpack.Configuration);
    const app = express();
    let nodeRunner = false;

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: '/',
            reporter: (middlewareOptions, options) => {
                if (options.state) {
                    // send signal to server node
                    if (!nodeRunner) {
                        nodeRunner = startNodeRunner();
                    }
                }
            },
            serverSideRender: true,
            writeToDisk: true,
        }),
    );
}

function startNodeRunner() {
    const serverCompiler = webpack(serverConfig({isProd: false}) as webpack.Configuration);

    let server: {
        kill(): void;
    };

    serverCompiler.watch({
        aggregateTimeout: 500,
        poll: true,
    }, (err: {}, stats: {}) => {
        if (err) {
            throw err;
        }

        if (server) {
            server.kill();
        }

        server = util.spawnCommand('node', ['dist/server'], {
            CURRENT_DIR_PATH: process.cwd() + '/dist',
        });
    });

    return true;
}
