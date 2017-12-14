let path = require('path');
let dirVars = require('../base/dir-vars.config');

module.exports = {
    alias: {
        /*目录*/
        iconfontDir: path.resolve(dirVars.buildDir, "iconfont/"),
        sassDir: path.resolve(dirVars.buildDir, "style/sass/"),
        libs: dirVars.libsDir,
    },
    // 当require的模块找不到时，尝试添加这些后缀后进行寻找
    extensions: ['.js', '.css', '.scss'],
}