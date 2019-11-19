const plugins = require('./plugins')
const jsRules = require('./rules/jsRules')
const stylesRules = require('./rules/styleRules')
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
        filename: IS_DEV ? '[name].js' : 'js/[name].[chunkhash].js',
        chunkFilename: IS_DEV ? '[name].js' : 'js/[name].[id].[chunkhash].js',
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
            '@utils': resolve('src/utils')
        }
    },
    plugins: [...plugins],
    module: {
        rules: [...jsRules, ...stylesRules]
    },
    optimization,
    devtool: IS_DEV ? 'eval-source-map' : undefined
    // 也可以采用externals减少common包大小, 不过在本项目中未采用
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    //     axios: 'axios'
    // }
}
