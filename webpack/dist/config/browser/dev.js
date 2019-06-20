"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:object-literal-sort-keys
var path = require('path');
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
function clientDevConfig(entry) {
    return {
        entry: entry,
        output: {
            path: path.resolve(process.cwd(), './dist/assets'),
            filename: 'h/[name].[hash].js',
            chunkFilename: 'h/[chunkhash].js',
            publicPath: "/",
            crossOriginLoading: 'anonymous',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'ts-loader',
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
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
                    test: /\.(jpg|png|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 5000,
                                name: 'h/[name].[hash].[ext]',
                                fallback: 'file-loader',
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff2|woff|eot|ttf)$/,
                    loaders: ['file-loader?name=h/[name].[hash].[ext]'],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
            }),
            new WriteFilePlugin({ force: true }),
            new ManifestPlugin({
                fileName: './manifest.json',
            }),
        ],
        mode: 'development',
        devtool: 'cheap-module-source-map',
        target: 'web',
    };
}
exports.clientDevConfig = clientDevConfig;
//# sourceMappingURL=dev.js.map