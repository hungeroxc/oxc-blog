
const { resolve } = require('./../utils')
const { cacheLoader, threadLoader } = require('./../loaders')
const { isDev } = require('./../constants')

module.exports = [
    {
        test: /\.scss$/,
        use: [
            'style-loader',
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
        use: ['css-loader']
    }
]
