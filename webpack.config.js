'use strict';

var path = require('path');
var webpack= require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var MINIFY = JSON.parse(process.env.MINIFY || '0');
var jsExtension = MINIFY ? '.min.js' : '.js';
var cssExtension = MINIFY ? '.min.css' : '.css';
module.exports = {
    entry: './src/browser.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'cc-image-lightbox' + jsExtension
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('cc-image-lightbox' + cssExtension)
    ]

};