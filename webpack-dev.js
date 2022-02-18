'use strict'

const {join, resolve} = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const packageVersion = JSON.stringify(require('./package.json').version);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    devServer: {
        https: true,
        static: resolve(__dirname, 'dist'),
        compress: true,
        port: 8888,
        host: 'localhost',
        watchContentBase: true,
        historyApiFallback: true,
        open: false,
        hot: false,
    },
    entry: [
    resolve(__dirname, 'src/main.js'),
    resolve(__dirname, 'Styles/main.scss')
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: "main.js",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.s?[ac]ss$/,
            use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
            ],
        },
        {
            test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
            loader: 'file-loader',
            options: {
                emitFile: false
            }
        }
        ]
    },
    stats: {
        children: false
    },
    performance: {
        hints: "warning",
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            VERSION: packageVersion
        }),
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new CopyPlugin( {
            patterns: [
                { from: join(__dirname, 'assets'), to: join(__dirname, 'dist', 'assets') },
                { from: join(__dirname, '_redirects'), to: join(__dirname, 'dist') },
            ]
        }),
        new HtmlWebpackPlugin({
            title: '',
            template: 'index.html',
            filename: join(__dirname, 'dist', '/index.html')
        })
    ]
}
