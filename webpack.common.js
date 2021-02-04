const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = () => {
  const rules = [
    {
      test: /\.(js|jsx)$/,
      loader: "babel-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            url: true,
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      loader: "url-loader?limit=10000&name=img/[name].[ext]",
    },
  ];

  return {
    entry: "./client/src/index.jsx",
    resolve: {
      modules: [path.resolve(__dirname, "server/node_modules"), "node_modules"],
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ESLintWebpackPlugin({
        files: "./client",
        fix: true,
        extensions: ["js", "jsx"],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "client/index.html"),
        filename: "index.html",
        inject: true,
      }),
    ].filter(Boolean),
    module: {
      rules,
    },
  };
};
