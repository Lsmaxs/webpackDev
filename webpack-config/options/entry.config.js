let path = require('path');
let dirVars = require('../base/dir-vars.config');
let pageArray = require('../base/page-entries.config')
let configEntry = {};

pageArray.forEach(page => {
    configEntry[page] = path.resolve(dirVars.pagesDir, `${page}/index`);
});

module.exports = configEntry;