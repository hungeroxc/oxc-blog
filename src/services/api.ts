import http from './http'

export const register = (data = {}) => {
    return http.post('register', data)
}

export function login(data = {}) {
    return http.post('login', data)
}
