const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
    new HtmlWebpackPlugin({
        template: 'build/tpl/index.html'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[id].[contenthash].css'
    })
]
