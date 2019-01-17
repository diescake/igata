const common = require('./webpack.common.js')

const production = {
  mode: 'production',
}

module.exports = {
  ...common,
  ...production,
}
