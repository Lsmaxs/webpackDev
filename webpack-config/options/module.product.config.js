let ExtractTextPlugin = require('extract-text-webpack-plugin');
let dirVars = require('../base/dir-vars.config.js');

const moduleConfig = require('./base/module.config.js');

moduleConfig.rules.push({
  test: /\.css$/,
  exclude: /node_modules|bootstrap/,
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        '-autoprefixer': true,
      },
    },
    {
      loader: 'postcss-loader',
    },
  ]),
});

moduleConfig.rules.push({
  test: /\.scss$/,
  include: dirVars.srcRootDir,
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        '-autoprefixer': true,
      },
    },
    {
      loader: 'postcss-loader',
    },
    {
      loader: 'sass-loader',
    },
  ]),
});

module.exports = moduleConfig;
