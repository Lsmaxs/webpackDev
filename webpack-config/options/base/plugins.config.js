let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let dirVars = require('../../base/dir-vars.config');
let pageArray = require('../../base/page-entries.config');

let configPlugins = [
    /*抽离所有公共部分*/
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons', //因为是公共的，chunk的name不能相同！！！
        filename: global.isProd ? '[name]/bundle_[chunkhash].js' : '[name]/bundle.js',
        minChunks: 4,
    }),
    /*抽取出webpack的runtime代码，避免稍微修复一下入口文件就会改动commonChunk,导致原本的浏览器缓存失效*/
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
        filename: 'commons/runtime.[hash].js',
    }),
    /*抽取出chunk的css*/
    new ExtractTextPlugin(global.isProd ? '[name]/style_[contenthash:8].css' : '[name]/styles.css'),
    /*配置好Dll*/
    new webpack.DllReferencePlugin({
        context: dirVars.staticRootDir, //指定一个路径作为上下文环境，需要于DllPlugin的context参数保持一致，建议统一设置为项目根目录
        manifest: require('../../../manifest.json'), // 指定manifest.json
        //name: 'dll', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    })

];

pageArray.forEach(page => {
    let htmlPlugin = new HtmlWebpackPlugin({
        filename: `${page}/index.html`,
        template: path.resolve(dirVars.pagesDir, `./${page}/index.html`),
        chunks: ['runtime', page, 'commons'],
    });
    configPlugins.push(htmlPlugin)
});


module.exports = configPlugins;