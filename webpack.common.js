/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* eslint-enable */

const param = {
  title: 'igata',
  entryPath: './src/main.tsx',
  distPath: './public',
  faviconPath: './src/assets/images/favicon.ico',
  dotEnvPath: './src/envs',
  templatePath: './src/assets/html/template.html',
}

const optimization = {
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    maxSize: 524288, // 500KB
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    automaticNameMaxLength: 30,
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
}

const plugins = [
  new HtmlWebpackPlugin({
    favicon: param.faviconPath,
    templateParameters: { title: param.title },
    template: param.templatePath,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
]

const common = isProd => ({
  entry: param.entryPath,
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
              hmr: !isProd,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
              importLoaders: 1,
              sourceMap: !isProd,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization,
  plugins,
})

module.exports = { param, common }
