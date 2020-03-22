const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|woff2)/,
                exclude: /(node_modules|bower_components)/,
                loader: "file-loader",
                options: {
                    name: "/images/[name].[ext]"
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "React Starter",
            template: path.resolve(__dirname, "public/index.html")
        })
    ]
};