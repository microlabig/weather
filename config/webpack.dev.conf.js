const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');  

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // настройка devserver
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist, // где будет открываться webpack
        port: 8080, // 8080 - м.б. сервером PHP и т.д.
        overlay: true, // показывать overlay
        historyApiFallback: true, // true - при переходе на несуществующую страницу, переходим на index.html
        noInfo: false, // false - показывать информацию как при успешной, так и при ошибочной сборке проекта, true - показывать только ошибки
    },
    plugins: [
        // для макс. корректной работы карты сайта
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),

        // для того, чтобы знать о неиспользуемых файлах в проекте
        new UnusedFilesWebpackPlugin({
            failOnUnused: true,
            patterns: ["src/*.*"]
        }),
    ]
});

module.exports = new Promise( (resolve, reject) => {
    resolve(devWebpackConfig);
});

