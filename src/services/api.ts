import http from './http'

export const register = (data = {}) => {
    return http.post('register', data)
}

export const login = (data = {}) => {
    return http.post('login', data)
}

export const createArticle = (data = {}) => {
    return http.post('article/create', data)
}
