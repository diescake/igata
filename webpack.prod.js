/* eslint-disable */
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const DotEnv = require('dotenv-webpack')
const { param, common } = require('./webpack.common.js')
/* eslint-enable */

const extConfig = {
  mode: 'production',
}

const extPlugins = [
  new CleanWebpackPlugin({ verbose: true }),
  new CopyPlugin([
    {
      from: 'src/assets/netlify/_redirects',
    },
  ]),
  new DotEnv({
    path: path.resolve(__dirname, `${param.dotEnvPath}/production.env`),
    safe: false,
  }),
]
const commonConfig = common(true)

module.exports = {
  ...commonConfig,
  ...extConfig,
  plugins: [...commonConfig.plugins, ...extPlugins],
}
