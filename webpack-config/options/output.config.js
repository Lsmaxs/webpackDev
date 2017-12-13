let dirVars = require('../base/dir-vars.config');
let baseConfig = require('../base/baseConfig');

module.exports = {
    path: dirVars.buildDir,
    publicPath: global.isProd ? baseConfig.URL : '/',
    filename: global.isProd ? '[name]/index_[chunkhash].js' : '[name]/index.js',
    chunkFilename: '[id].[chunkhash].bundle.js',
}