// development  production

export const baseUrls = {
    development: {
        BASE_URL: process.env.APP_ENV === 'qa' ? 'http://111.230.107.109:3000/api' : 'http://127.0.0.1:3000/api'
    },
    production: {
        BASE_URL: 'https://oxcblog.club/api'
    }
}
