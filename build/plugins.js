const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
    new HtmlWebpackPlugin({
        template: 'build/tpl/index.html'
    })
]
