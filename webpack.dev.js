/* eslint-disable */
const webpack = require('webpack')
const path = require('path')

const DotEnv = require('dotenv-webpack')
const { param, common } = require('./webpack.common.js')
/* eslint-enable */

const extConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    https: false,
    host: '0.0.0.0',
    port: 8080,
    watchContentBase: false,
    contentBase: param.distPath,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
  },
}

const extPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new DotEnv({
    path: path.resolve(__dirname, `${param.dotEnvPath}/development.env`),
    safe: false,
  }),
]

const commonConfig = common(false)

module.exports = {
  ...commonConfig,
  ...extConfig,
  plugins: [...commonConfig.plugins, ...extPlugins],
}
