// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = ({ config }) => {
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = { '@': path.resolve(__dirname, '../../..') }
  config.resolve.extensions.push('.ts', '.tsx')

  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: ['ts-loader', 'react-docgen-typescript-loader'],
    },
    { test: /\.(yaml|yml)$/, use: ['json-loader', 'yaml-loader'] },
    { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
    { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
    {
      test: /\.(css)$/,
      include: path.resolve(__dirname, '..'),
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]__[hash:base64:5]',
            },
            importLoaders: 1,
            sourceMap: false,
          },
        },
        'sass-loader',
      ],
    }
  )

  return config
}
