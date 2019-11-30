const path = require('path')


module.exports = [
    {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 14000,
                    name: path.posix.join('assets', `[name].[hash:7].[ext]`)
                }
            }
        ]
    }
]
