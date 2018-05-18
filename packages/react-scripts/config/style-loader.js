'use strict';
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postCssOptions = {
  // Necessary for external CSS imports to work
  // https://github.com/facebookincubator/create-react-app/issues/2677
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 10', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
};

module.exports = (loader, test, exclude) => isDev => {
  let loaders = isDev
    ? [
        {
          loader: require.resolve('style-loader'),
        },
      ]
    : [];

  loaders = loaders.concat([
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize: !isDev,
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: postCssOptions,
    },
  ]);

  if (loader) {
    loaders.push({
      loader,
    });
  }

  if (isDev) {
    return {
      test,
      exclude,
      use: loaders,
    };
  }

  return {
    test,
    exclude,
    loader: ExtractTextPlugin.extract({
      fallback: require.resolve('style-loader'),
      use: loaders,
    }),
  };
};
