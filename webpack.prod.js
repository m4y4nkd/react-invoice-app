const { merge } = require("webpack-merge");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

module.exports = (env) =>
  merge(common(env), {
    mode: "production",
    output: {
      path: `${__dirname}/dist/client`,
      filename: "[name].[contenthash].bundle.js",
      globalObject: "this", // https://github.com/webpack/webpack/issues/6642#issuecomment-370222543
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
        }),
      ],
      runtimeChunk: "single",
      usedExports: true,
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].bundle.css",
      }),
    ],
  });
