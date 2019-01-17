const webpack = require('webpack')
const path = require('path')

module.exports = (env, argv) => {
  return {
    entry: './src/main.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
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
  }
}
