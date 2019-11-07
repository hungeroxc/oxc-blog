const path = require('path')

exports.resolve = dir => {
    return path.join(__dirname, './../', dir)
}

exports.assetsPath = _path => {
    // 路径兼容使用posix
    return path.posix.join('static', _path)
}

