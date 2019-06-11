// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: ['ts-loader', 'react-docgen-typescript-loader'],
    },
    { test: /\.(yaml|yml)$/, use: ['json-loader', 'yaml-loader'] }
  )
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = { '@': path.resolve(__dirname, '../../..') }
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
