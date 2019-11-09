import http from './http'

export const test = (data = {}) => {
    http.get('/test', data)
}
