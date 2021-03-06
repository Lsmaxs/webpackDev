let glob = require('glob');
let dirVars = require('./dir-vars.config');
let options = {
    cwd: dirVars.pagesDir,//在页面目录里面找
    sync: true  //这里无法异步
};

let globInstance = new glob.Glob('!(_)*/!(_)*',options); //考虑到多个页面共用HTML等资源的情况，跳过以'_'开头的目录

module.exports = globInstance.found; //一个数组，形如['index/index', 'index/login', 'alert/index']