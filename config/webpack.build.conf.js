const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ImageminPlugin = require('imagemin-webpack-plugin').default; // плагин для сжатия изображений (д.б. обязательно (!) после CopyWebpackPlugin)
const imageminMozjpeg = require('imagemin-mozjpeg'); // плагин алгоритма mozJpeg сжатия jpeg

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new ImageminPlugin(
            { 
                test: /\.(jpe?g|png|gif)$/i,
                // оптимизация png
                pngquant: { 
                    quality: '65-90'
                },
                // оптимизация gif
                gifsicle: {
                    optimizationLevel: 2
                },
                plugins: [
                    // оптимизация jpe?g
                    imageminMozjpeg({
                        progressive: true, // не прогрессивные изображения загружаются сверху вниз, прогрессивные - сначала размыто, потом загружается полностью
                        quality: 70
                    })
                ]
                
                // optipng.enabled: false will disable optipng
                // optipng: {
                //     //enabled: false,
                //     optimizationLevel: 9
                // },
                // pngquant: {
                //     quality: '65-90',
                //     speed: 4
                // },
                // gifsicle: {
                //     interlaced: false,
                // },
                // // the webp option will enable WEBP
                // webp: {
                //     quality: 75
                // },
                // externalImages: {
                //     context: 'src', // Important! This tells the plugin where to "base" the paths at
                //     sources: glob.sync('src/assets/img/**/*'),
                //     destination: 'dist/assets/img/**/*',
                //     fileName: '[path][name].[ext]' // (filePath) => filePath.replace('jpg', 'webp') is also possible
                // }
            }
        )
    ]
});

module.exports = new Promise( (resolve, reject) => {
    resolve(buildWebpackConfig);
});