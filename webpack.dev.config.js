const {merge} = require("webpack-merge");
const { DefinePlugin } = require('webpack');
const path = require("path");
const commonWebpackConfig = require("./webpack.common.config");

module.exports = merge(commonWebpackConfig, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "main.js"
    },
    plugins: [
        new DefinePlugin({ 
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ],
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: {
                    loader: "file-loader"
                }
            }
        ]
    },
    devServer: {
        port: 9002,
        historyApiFallback: true,
        hot: true
    },
});