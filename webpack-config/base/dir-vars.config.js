let path = require('path');
let moduleExports = {};

function resolve(dir, paths) {
    return path.resolve(dir, paths);
}

moduleExports.staticRootDir = resolve(__dirname, '../../'); //根目录
moduleExports.srcRootDir = resolve(moduleExports.staticRootDir, './src'); //业务代码根目录
moduleExports.publicDir = resolve(moduleExports.srcRootDir, './public-resource'); // 存放各个页面使用到的公共资源
moduleExports.dllDir = path.resolve(moduleExports.srcRootDir, './dll'); // 存放由各种不常改变的js/css打包而来的dll
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, './pages'); // 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
moduleExports.libsDir = resolve(moduleExports.publicDir, './libs');  // 与业务逻辑无关的库都可以放到这里

moduleExports.buildDir = resolve(moduleExports.staticRootDir, './dist'); //编译后生产的所有资源

module.exports = moduleExports;
