const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { isDev } = require('./constants.js')

module.exports = isDev
    ? {}
    : {
          minimize: true,
          minimizer: [
              new TerserPlugin({
                  terserOptions: {
                      parse: {
                          ecma: 8
                      },
                      compress: {
                          ecma: 5,
                          warnings: false,
                          comparisons: false,
                          inline: 2
                      },
                      mangle: {
                          safari10: true
                      },
                      output: {
                          ecma: 5,
                          comments: false,
                          ascii_only: true
                      }
                  },
                  cache: true,
                  sourceMap: false
              }),
              new OptimizeCSSAssetsPlugin({
                  cssProcessorOptions: {
                      map: false 
                  }
              })
          ],
          splitChunks: {
              chunks: 'all',
              name: false,
              cacheGroups: {
                  commons: {
                      name: 'commons',
                      chunks: 'initial',
                      minChunks: 2
                  },
                  'react-vendor': {
                        test: /[\\/]node_modules[\\/](react|react-dom|redux|react-router-dom)[\\/]/,
                        name: 'react-vendor',
                        priority: 3,
                        reuseExistingChunk: false
                  },
                  'antd-vendor': {
                    test: /[\\/]node_modules[\\/](antd)[\\/]/,
                    name: 'antd-vendor',
                    priority: 2,
                    reuseExistingChunk: false
                  }
              }
          },
          runtimeChunk: true
      }
