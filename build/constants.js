
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

const isDev = process.env.NODE_ENV === 'development'
const APP_ENV = process.env.APP_ENV

module.exports = {
    FILE_EXTENSIONS,
    isDev,
    APP_ENV
}
