const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const distPath = './public'
const faviconPath = './src/assets/images/favicon.ico'
const title = 'igata'

const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: distPath,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
}

const productionConfig = {
  mode: 'production',
}

const commonConfig = (env, argv) => ({
  entry: './src/main.tsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, distPath),
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
    new CleanWebpackPlugin(distPath),
    new HtmlWebpackPlugin({
      favicon: faviconPath,
      templateParameters: { title: argv.mode === 'development' ? 'DEVELOPMENT' : title },
      template: './src/assets/html/template.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
})

module.exports = (env, argv) => ({
  ...commonConfig(env, argv),
  ...(() => argv.mode === 'production' ? productionConfig : developmentConfig)(),
})
