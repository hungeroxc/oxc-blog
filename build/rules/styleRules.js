const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolve } = require('./../utils')
const { cacheLoader, threadLoader } = require('./../loaders')
const { isDev } = require('./../constants')

const loader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader

module.exports = [
    {
        test: /\.scss$/,
        use: [
            loader,
            cacheLoader,
            threadLoader(2),
            'css-modules-typescript-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            },
            {
                loader: 'sass-loader'
            }
        ]
    },
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: [loader, 'css-loader']
    }
]
