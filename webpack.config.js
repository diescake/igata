const webpack = require('webpack')
const path = require('path')

module.exports = (env, argv) => {
  return {
    entry: './src/main.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public'),
    }
  }
}
