/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ESLintPlugin = require("eslint-webpack-plugin");

// TODO: dev/prod modes
// eslint-disable-next-line no-undef
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sc|c)ss$/i,
        exclude: /\.md\.(sc|c)ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.md\.(sc|c)ss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                namedExport: true,
                localIdentName: '[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly'
              },
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      extensions: ["ts", "tsx"],
      overrideConfigFile: ".eslintrc"
    }),
    // TODO: consider concurrently + style-types watch instead
    // style typings
    new WebpackShellPluginNext({
      onBuildStart:{
        scripts: ['npm run style-types'],
      },
      dev: false, // makes sure command runs on file change
    }),
    new webpack.WatchIgnorePlugin({ paths: [
      /(sc|c)ss\.d\.ts$/
    ] })
  ],
  output: {
    filename: '[name].bundle.js',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
