const { resolve } = require('./utils')
const { isDev } = require('./constants.js')

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        cacheDirectory: resolve('.cache-loader')
    }
}

// node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs: 2
// https://webpack.docschina.org/guides/build-performance/#sass
const threadLoader = workerParallelJobs => {
    const options = { workerParallelJobs }
    // 该处只处于生产环境时候才设置poolTimeout为无限，否则生产环境打包完成后进程会被阻塞
    if(isDev) {
        Object.assign(options, { poolTimeout: Infinity })
    }

    return { loader: 'thread-loader', options }
}

module.exports = {
    cacheLoader,
    threadLoader
}
