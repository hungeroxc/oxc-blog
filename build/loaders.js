const { resolve } = require('./utils')
const { IS_DEV } = require('./constants.js')

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
    // poolTimeout最好不要设为无限大，否则worker一直存在，则打包完毕后进程一直不退出
    Object.assign(options, { poolTimeout: 2000 })

    return { loader: 'thread-loader', options }
}

module.exports = {
    cacheLoader,
    threadLoader
}
