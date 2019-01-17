const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const param = {
  distPath: './public',
  faviconPath: './src/assets/images/favicon.ico',
  title: 'igata',
}

module.exports = {
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
  },
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(param.distPath),
    new HtmlWebpackPlugin({
      favicon: param.faviconPath,
      templateParameters: { title: param.title },
      template: './src/assets/html/template.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
