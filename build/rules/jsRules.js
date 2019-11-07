const { resolve } = require('./../utils')
const { cacheLoader, threadLoader } = require('./../loaders')

module.exports = [
    {
        test: /\.(j|t)sx?$/,
        include: resolve('src'),
        use: [
            cacheLoader,
            threadLoader(),
            {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['@babel/preset-typescript', '@babel/preset-react']
                }
            }
        ]
    }
]

