const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const param = {
  distPath: './public',
  faviconPath: './src/assets/images/favicon.ico',
  dotEnvPath: './src/envs',
  title: 'igata',
}

const common = {
  entry: './src/main.tsx',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, param.distPath),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(css|scss|sass)$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: param.faviconPath,
      templateParameters: { title: param.title},
      template: './src/assets/html/template.html',
    }),
  ],
}

module.exports = { param, common }
