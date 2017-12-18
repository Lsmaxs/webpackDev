let baseConfig = require('../base/baseConfig');
let AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
let webpack = require('webpack');
let pluginsConfig = require('./base/plugins.config');
let dirVars = require('../base/dir-vars.config');

pluginsConfig.push(new AddAssetHtmlPlugin({
    filepath: `${dirVars.srcRootDir}/dll/dll*.js`,
    outputPath: 'dll/',
    publicPath: baseConfig.URL,
    includeSourcemap: false,
}));

pluginsConfig.push(new AddAssetHtmlPlugin({
    filepath: `${dirVars.srcRootDir}/public-resource/libs/flexible/flexible.min.js`,
    outputPath: 'dll/',
    publicPath: baseConfig.URL,
    includeSourcemap: false,
}));

pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
    },
}));

pluginsConfig.push(new webpack.DefinePlugin({
    IS_PRODUCTION: true,
}));

pluginsConfig.push(new webpack.NoEmitOnErrorsPlugin()); // 配合CLI的--bail，一出error就终止webpack的编译进程

pluginsConfig.push(new webpack.LoaderOptionsPlugin({
    options: {
        postcss: require('../vendor/postcss.config.js'),
        // eslint: require('../vendor/eslint.config.js'),
    },
}));

/* HashedModuleIdsPlugin 这个插件，他是根据模块的相对路径生成一个长度只有四位的字符串作为模块的 module id ，
这样就算引入了新的模块，也不会影响 module id 的值，只要模块的路径不改变的话。 */
pluginsConfig.push(new webpack.HashedModuleIdsPlugin());

if(global.showAnalyzer){
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    pluginsConfig.push(new BundleAnalyzerPlugin({analyzerPort: 9898,}))
}


module.exports = pluginsConfig;