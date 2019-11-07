const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = [
    new HtmlWebpackPlugin({
        template: 'build/tpl/index.html'
    }),
    new ForkTsCheckerWebpackPlugin()
]
