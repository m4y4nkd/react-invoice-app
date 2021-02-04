const { merge } = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

module.exports = (env) =>
  merge(common(env), {
    mode: "development",
    output: {
      path: `${__dirname}/dist/client`,
      filename: "[name].[hash].bundle.js",
      publicPath: "/",
      globalObject: "this", // https://github.com/webpack/webpack/issues/6642#issuecomment-370222543
    },
    optimization: {
      usedExports: true,
    },
    devtool: "eval-source-map",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      hot: true,
      port: 8080,
      historyApiFallback: true,
      proxy: {
        "/development/react-invoice-app/api/": "http://localhost:4000",
        "/development/react-invoice-app/ws": {
          target: "ws://localhost:4000",
          ws: true,
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[hash].bundle.css",
      }),
    ],
  });
