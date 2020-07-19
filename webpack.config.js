const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
//const { VuetifyLoaderPlugin } = require("vuetify-loader");

const isProductionBuild = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          isProductionBuild
            ? "css-loader"
            : { loader: "css-loader", options: { sourceMap: true } },
          isProductionBuild
            ? "sass-loader"
            : {
                loader: "sass-loader",
                options: {
                  implementation: require("sass"),
                  sassOptions: {
                    fiber: require("fibers"),
                    sourceMap: true
                  }
                }
              }
        ]
      },
      // {
      //   test: /\.sass$/,
      //   use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      // },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: [
              "vue-style-loader",
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  implementation: require("sass"),
                  sassOptions: {
                    fiber: require("fibers")
                  }
                }
              }
            ],
            sass: [
              "vue-style-loader",
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  implementation: require("sass"),
                  sassOptions: {
                    fiber: require("fibers"),
                    indentedSyntax: true // optional
                  }
                }
              }
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-syntax-dynamic-import"] // динамический импорт и для async/await
            }
          }
          //'eslint-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      },
      {
        //test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, // обращаемся к шрифтам
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, // обращаемся к шрифтам
        loaders: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src/")
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true, // true - при переходе на несуществующую страницу, переходим на index.html
    noInfo: false, // false - показывать информацию как при успешной, так и при ошибочной сборке проекта
    overlay: true // показывать overlay
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [
    new VueLoaderPlugin(), 
    //new VuetifyLoaderPlugin({})
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
