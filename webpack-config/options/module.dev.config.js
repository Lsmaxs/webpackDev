const dirVars = require('../base/dir-vars.config');

let moduleConfig = require('./base/module.config');

moduleConfig.rules.push({
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        }
    ]
});

moduleConfig.rules.push({
    test: /\.scss$/,
    include: dirVars.srcRootDir,
    use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
        },
        {
            loader: 'sass-loader',
        }
    ]
});

module.exports = moduleConfig;