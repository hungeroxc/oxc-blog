const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { IS_DEV, ICONFONT_SRC_URL, HIGHLIGHT_SRC_URL } = require('./constants')

module.exports = [
    new webpack.DefinePlugin({
        'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV)
    }),
    new HtmlWebpackPlugin({
        template: 'build/tpl/index.html',
        inject: true,
        favicon: 'build/tpl/favicon.ico',
        templateParameters: { iconfontSrcUrl: ICONFONT_SRC_URL, hightlightSrcUrl: HIGHLIGHT_SRC_URL }
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash].css',
        chunkFilename: IS_DEV ? 'css/[name].[id].css' : 'css/[name].[id].[contenthash].css'
    }),
    // new BundleAnalyzerPlugin()
]
