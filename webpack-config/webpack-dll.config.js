let fs = require('fs');
let rimraf = require('rimraf');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let dirVars = require('./base/dir-vars.config');
rimraf(dirVars.dllDir, fs, function cb() {
    console.log('dll目录已清空');
});

module.exports = {
    entry: {
        dll: [
            'axios',
        ],
    },
    output: {
        path: dirVars.dllDir,
        filename: '[name]_[chunkhash].js',
        library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
            name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
            context: dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
        }),
        new ExtractTextPlugin('[name].css'), // 打包css/sass的时候会用到ExtractTextPlugin
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: require('./vendor/postcss.config.js'),
            },
        }),
    ],
    module: require('./options/module.product.config.js'), // 沿用业务代码的module配置
    resolve: require('./options/resolve.config.js'), // 沿用业务代码的resolve配置
}