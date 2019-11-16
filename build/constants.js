
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

const IS_DEV = process.env.NODE_ENV === 'development'
const APP_ENV = process.env.APP_ENV

module.exports = {
    FILE_EXTENSIONS,
    IS_DEV,
    APP_ENV
}
