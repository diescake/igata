const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const param = {
  distPath: './public',
  faviconPath: './src/assets/images/favicon.ico',
  dotEnvPath: './src/envs',
  title: 'igata',
}

const common = {
  entry: './src/main.tsx',
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
      { test: /\.(json)$/, use: 'json-loader' },
      { test: /\.(yaml|yml)$/, use: ['json-loader', 'yaml-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
      { test: /\.(js)$/, use: 'source-map-loader', enforce: 'pre' },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]',
              sourceMap: true, // FIXME: Enable on building production only
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: param.faviconPath,
      templateParameters: { title: param.title },
      template: './src/assets/html/template.html',
    }),
  ],
}

module.exports = { param, common }
