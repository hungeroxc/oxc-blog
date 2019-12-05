const plugins = require('./plugins')
const jsRules = require('./rules/jsRules')
const stylesRules = require('./rules/styleRules')
const fileRules = require('./rules/fileRules')
const { resolve } = require('./utils')
const { FILE_EXTENSIONS, IS_DEV, APP_ENV } = require('./constants')
const optimization = require('./optimization')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: resolve('src/index.tsx')
    },
    output: {
        path: resolve(`dist/${APP_ENV}/static`),
        filename: IS_DEV ? 'js/[name].js' : 'js/[name].[chunkhash].js',
        chunkFilename: IS_DEV ? 'js/[name].js' : 'js/[name].[id].[chunkhash].js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: FILE_EXTENSIONS,
        modules: [resolve('src'), resolve('node_modules')],
        alias: {
            '@views': resolve('src/containers/views'),
            '@constants': resolve('src/constants'),
            '@services': resolve('src/services'),
            '@shared': resolve('src/containers/shared'),
            '@store': resolve('src/store'),
            '@utils': resolve('src/utils'),
            '@assets': resolve('src/assets')
        }
    },
    plugins: [...plugins],
    module: {
        rules: [...jsRules, ...stylesRules, ...fileRules]
    },
    optimization,
    // 测试环境使用.map文件，方便以后对sentry搭建进行测试
    devtool: IS_DEV ? 'source-map' : undefined,
    externals: {
        'highlight.js': 'hljs'
    }
}
