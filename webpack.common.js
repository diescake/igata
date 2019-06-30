/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* eslint-enable */

const param = {
  distPath: './public',
  faviconPath: './src/assets/images/favicon.ico',
  dotEnvPath: './src/envs',
  title: 'igata',
}

const common = isProd => ({
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
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.sass', '.css', '.yaml', '.yml'],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(yaml|yml)$/, use: ['json-loader', 'yaml-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
      { test: /\.(js)$/, use: 'source-map-loader', enforce: 'pre' },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: false, // FIXME: Enable on building development only
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
              importLoaders: 1,
              sourceMap: false, // FIXME: Enable on building development only
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: param.faviconPath,
      templateParameters: { title: param.title },
      template: './src/assets/html/template.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
})

module.exports = { param, common }
