// tslint:disable:object-literal-sort-keys
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

export function clientDevConfig(entry: string | { [index: string]: string }) {
    return {
        entry,
        output: {
            path: path.resolve(process.cwd(), './dist/assets'),
            filename: 'h/[name].[hash].js',
            chunkFilename: 'h/[chunkhash].js',
            publicPath: `/`,
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
