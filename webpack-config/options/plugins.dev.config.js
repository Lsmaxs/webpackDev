let webpack = require('webpack');
let path = require('path');
let pluginsConfig = require('./base/plugins.config.js');
let dirVars = require('../base/dir-vars.config.js');
let AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin")

pluginsConfig.push(new AddAssetHtmlPlugin({
    //filepath: path.resolve(__dirname, '../../src/dll/dll*.js'),
     filepath: `${dirVars.srcRootDir}/dll/dll*.js`,
    // filepath: path.resolve(__dirname, `${dirVars.srcRootDir}/dll/dll*.js`),
    // outputPath:'dll/',
    // publicPath: path.join(config.build.dll.publicPath),
    includeSourcemap: false,
}));

pluginsConfig.push(new webpack.DefinePlugin({
    IS_PRODUCTION: false,
}));

pluginsConfig.push( new webpack.HotModuleReplacementPlugin());

pluginsConfig.push(new webpack.LoaderOptionsPlugin({
    options: {
        postcss: require('../vendor/postcss.config.js'),
        // eslint: require('../vendor/eslint.config.js'),
        devServer: require('../vendor/devServer.config.js'),
    },
}));

module.exports = pluginsConfig;