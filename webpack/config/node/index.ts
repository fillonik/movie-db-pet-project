// tslint:disable:object-literal-sort-keys
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

export function serverConfig(params: {isProd: boolean}) {
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
