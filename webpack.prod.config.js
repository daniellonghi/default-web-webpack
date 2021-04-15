const {merge} = require("webpack-merge");
const { DefinePlugin } = require('webpack');
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const commonWebpackConfig = require("./webpack.common.config");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonWebpackConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].main.js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new CleanWebpackPlugin(),
        new DefinePlugin({ 
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    module : {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "images"
                    }
                }
            }
        ]
    }
});