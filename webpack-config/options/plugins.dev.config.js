let webpack = require('webpack');
let path = require('path');
let pluginsConfig = require('./base/plugins.config.js');
let dirVars = require('../base/dir-vars.config.js');

pluginsConfig.push(new webpack.DefinePlugin({
    IS_PRODUCTION: false,
}));

pluginsConfig.push(new webpack.LoaderOptionsPlugin({
    options: {
        postcss: require('../vendor/postcss.config.js'),
        // eslint: require('../vendor/eslint.config.js'),
        devServer: require('../vendor/devServer.config.js'),
    },
}));

module.exports = pluginsConfig;