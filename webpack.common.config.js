const HtmlWebpackPlugin = require("html-webpack-plugin");
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/Templates", "index.html"),
            favicon: "./src/Images/favicon.png",
            preload: '*.*'
        }),
        new ResourceHintWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: path.resolve(__dirname, "node_modules")
            }
        ]
    }
}