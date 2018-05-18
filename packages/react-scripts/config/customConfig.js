'use strict';

const styleLoader = require('./style-loader');
const sassLoader = require.resolve('sass-loader');
const lessLoader = require.resolve('less-loader');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  babelPlugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
  webpackLoaders: [
    styleLoader(sassLoader, /\.s[ac]ss$/)(isDev),
    styleLoader(lessLoader, /\.less$/)(isDev),
  ],
};
