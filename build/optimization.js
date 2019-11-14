const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { isDev } = require('./constants.js')

module.exports = isDev
    ? {}
    : {
          runtimeChunk: {
              name: 'manifest'
          },
          splitChunks: {
              // 在首页就有可能加载所有的包，所以忽略权限，全部打包到一个vendor里面
              cacheGroups: {
                  default: false,
                  commons: {
                      name: 'commons',
                      chunks: 'initial',
                      minChunks: 2
                  },
                  react: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                        name: 'react',
                        priority: 8,
                        reuseExistingChunk: false
                    },
                  antd: {
                      name: 'antd',
                      test: /[\\/]node_modules[\\/](antd)[\\/]/,
                      priority: 9,
                      reuseExistingChunk: false
                  },

                  vendor: {
                      name: 'vendor',
                      test: /[\\/]node_modules[\\/](moment|axios)[\\/]/,
                      priority: 10,
                      reuseExistingChunk: false
                  }
              }
          },
          minimizer: [
              new TerserPlugin({
                  cache: true,
                  parallel: true
              }),
              new OptimizeCSSAssetsPlugin({
                  cssProcessor: require('cssnano'),
                  cssProcessorOptions: { safe: true, autoprefixer: false, discardComments: { removeAll: true } },
                  canPrint: true
              })
          ]
      }
