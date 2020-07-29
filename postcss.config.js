// npm install postcss-loader autoprefixer css-mqpacker cssnano postcss-pxtorem postcss-inline-svg --save-dev

module.exports = ({ file, options, env }) => ({
  plugins: {
    // инлайновые svg
    "postcss-inline-svg": {
      removeFill: true,
      paths: ["./src/assets/img/icons/svg"]
    },

    // px2rem
    "postcss-pxtorem": {
      rootValue: 16, // по-умолчанию, размер шрифта 16px
      propList: ["*", "!*border*"], // игнорировать CSS св-ва, в которых содержится слово "border"
      selectorBlackList: [/^(html|pug)$/] // игнорировать в html- и pug-файлах
    },

    // autoprefixer
    autoprefixer: env === "production" ? true : false,

    // упаковщик медиа-запросов
    "css-mqpacker": env === "production" ? true : false,

    // px -> rem
    "postcss-pxtorem": {
      rootValue: 16, // по-умолчанию, размер шрифта 16px
      propList: ["*", "!*border*"], // игнорировать CSS св-ва, в которых содержится слово "border"
      selectorBlackList: [/^(html|pug)$/] // игнорировать в html- и pug-файлах
    }
  }
});
