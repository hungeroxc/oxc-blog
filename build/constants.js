
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

const IS_DEV = process.env.NODE_ENV === 'development'
const APP_ENV = process.env.APP_ENV

const ICONFONT_SRC_URL = 'https://at.alicdn.com/t/font_587439_u4qlz4zvzyq.js'
// const HIGHLIGHT_SRC_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js'

module.exports = {
    FILE_EXTENSIONS,
    IS_DEV,
    APP_ENV,
    ICONFONT_SRC_URL,
    // HIGHLIGHT_SRC_URL
}
