
/**
 * 替换\n\r换行符
 * @param str
 * @returns {void|*|XML|string}
 */
module.exports.linebreakReplace = (str) => {
    return str.replace(/[\n\r]/g, '<br>');
};

/**
 * 数字超过1000自动换算成k并且保留一位小数
 * @created on 2017/9/18
 * @author laixinyu <laixinyualex@gmail.com>
 **/
module.exports.unitConversion = (number) => {
    let num = Number(number);

    if (num >= 1000) {
        num = num / 1000;

        return num.toFixed(1) + 'k';
    } else {
        return num;
    }
};

/**
 * 动态加载js
 * @param url
 * @param callback
 */
module.exports.loadScript = (url, callback) => {
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    if (typeof(callback) != 'undefined') {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
    }
    script.src = url;

    document.body.appendChild(script);
};