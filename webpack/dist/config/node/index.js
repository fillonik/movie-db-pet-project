"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:object-literal-sort-keys
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
function serverConfig(params) {
    return {
        entry: {
            index: './src/node',
        },
        output: {
            path: path.resolve(process.cwd(), './dist/server'),
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                onlyLocals: true,
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.json$/,
                    use: 'json-loader',
                },
                {
                    test: /\.(svg|png)$/,
                    loaders: ['url-loader?limit=5000&name=h/[name].[hash].[ext]'],
                },
                {
                    test: /\.(jpg|woff2|woff|eot|ttf)$/,
                    loaders: ['file-loader?name=h/[name].[hash].[ext]'],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.css'],
        },
        externals: [nodeExternals()],
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': params.isProd ? '"production"' : '"development"',
            }),
        ],
        target: 'node',
        mode: 'development',
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false,
        },
    };
}
exports.serverConfig = serverConfig;
//# sourceMappingURL=index.js.map