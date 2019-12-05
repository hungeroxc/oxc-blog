
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

const IS_DEV = process.env.NODE_ENV === 'development'
const APP_ENV = process.env.APP_ENV

const ICONFONT_SRC_URL = 'http://at.alicdn.com/t/font_587439_6381m1obx75.js'
const HIGHLIGHT_SRC_URL = 'https://cdn.bootcss.com/highlight.js/9.15.6/highlight.min.js'

module.exports = {
    FILE_EXTENSIONS,
    IS_DEV,
    APP_ENV,
    ICONFONT_SRC_URL,
    HIGHLIGHT_SRC_URL
}
