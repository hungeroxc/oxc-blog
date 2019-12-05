const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { IS_DEV } = require('./constants')

module.exports = [
    new HtmlWebpackPlugin({
        template: 'build/tpl/index.html'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash].css',
        chunkFilename: IS_DEV ? 'css/[name].[id].css' : 'css/[name].[id].[contenthash].css'
    })
]
