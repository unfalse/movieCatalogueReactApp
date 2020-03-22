/*
    Config for webpack 4 was taken from:
        https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658
    Lines for TypeScript:
        https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
*/

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const bundlePath = path.resolve(__dirname, '..', "dist");
const publicPath = path.resolve(__dirname, '..', "public");

console.log(path.resolve(publicPath, 'index.html'));
console.log(path.resolve(bundlePath, 'index.html'));

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: bundlePath,
        publicPath: "/",
        filename: "bundle.js"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|pdf)$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|woff2)/,
                // exclude: /(node_modules|bower_components)/,
                loader: "file-loader",
                options: {
                    name: "assets/[name].[ext]"
                }
            }
        ]
    },

    devServer: {
        contentBase: publicPath,
        port: 4000,
        publicPath: "http://localhost:4000",
        hotOnly: true
    },
    plugins: [
        // new CopyPlugin([
        //     { from: path.resolve(publicPath, 'index.html'), to: path.resolve(bundlePath, 'index.html') }
        // ]),
        new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({ 
            template: path.join(publicPath, 'index.html')
        })
    ]
};