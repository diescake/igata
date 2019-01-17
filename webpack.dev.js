const common = require('./webpack.common.js')

const development = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: './public',
    historyApiFallback: {
      disableDotRule: true,
    },
  },
}

module.exports = {
  ...common,
  ...development,
}
