'use strict';
/*
    Config for webpack 4 was taken from:
        https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658
    Lines for TypeScript:
        https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const bundlePath = path.resolve(__dirname, './../build/');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    watch: true,
    output: {
        path: bundlePath,
        publicPath: '.',
        filename: 'bundle.js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /\.module\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                sideEffects: true,
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|pdf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|woff2)/,
                // exclude: /(node_modules|bower_components)/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Starter',
            template: path.resolve(__dirname, './../public/index.html'),
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, './../public/db.json'),
                to: path.resolve(__dirname, './../build/db.json'),
            },
        ]),
    ],

    watchOptions: {
        aggregateTimeout: 600,
        ignored: /node_modules/,
        poll: 1000, // Check for changes every second
    },
};