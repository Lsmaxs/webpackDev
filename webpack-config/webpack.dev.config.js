
global.isProd = false;

module.exports = {
    entry:require('./options/entry.config'),

    output:require('./options/output.config'),

    module:require('./options/module.dev.config'),

    resolve:require('./options/reslove.config'),

    plugins:require('./options/plugins.dev.config'),

    externals:require('./options/externals.config'),

    devServer:require('./vendor/devServer.config'),
}