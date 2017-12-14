

global.isProd = true;

module.exports={
    devtool: "source-map",

    entry: require('./options/entry.config.js'),

    output: require('./options/output.config.js'),

    module: require('./options/module.product.config.js'),

    resolve: require('./options/resolve.config.js'),

    plugins: require('./options/plugins.product.config.js'),

    externals: require('./options/externals.config.js'),
}