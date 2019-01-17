const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const faviconPath = './src/assets/images/favicon.ico'
const title = 'igata'

module.exports = (env, argv) => {
  return {
    entry: './src/main.tsx',
    output: {
      filename: '[name].bundle.js',
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
    plugins: [
      new CleanWebpackPlugin('public'),
      new HtmlWebpackPlugin({
        favicon: faviconPath,
        templateParameters: { title },
        template: './src/assets/html/template.html',
      })
    ]
  }
}
