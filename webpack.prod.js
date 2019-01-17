const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const DotEnv = require('dotenv-webpack')
const { param, common } = require('./webpack.common.js')

const extConfig = {
  mode: 'production',
}

const extPlugins = [
  new CleanWebpackPlugin(param.distPath),
  new DotEnv({
    path: path.resolve(__dirname, `${param.dotEnvPath}/production.env`),
    safe: false,
  }),
]

module.exports = {
  ...common,
  ...extConfig,
  plugins: [
    ...common.plugins,
    ...extPlugins,
  ],
}
