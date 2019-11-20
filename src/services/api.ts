import http from './http'

export const register = (data = {}) => {
    return http.post('register', data)
}

export const login = (data = {}) => {
    return http.post('login', data)
}

// 创建文章
export const createArticle = (data = {}) => {
    return http.post('article/create', data)
}

// 获取文章列表
export const getArticleList = (data = {}) => {
    return http.get('article/list', data)
}

// 获取文章详情
export const getArticleById = (data = {}) => {
    return http.get('article/detail', data)
}
