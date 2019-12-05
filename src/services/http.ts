import axios, { AxiosRequestConfig, Method } from 'axios'
import { message } from 'antd'
import qs from 'qs'

import { baseUrls } from '@constants/index'

type Request = (url: string, data?: object, baseUrl?: string) => Promise<any>

interface HttpRequest {
    get?: Request
    post?: Request
    delete?: Request
    put?: Request
}

const http: HttpRequest = {}
const methods: Method[] = ['get', 'post', 'delete', 'put']

const DEFAULTBASEURL = {
    baseURL: baseUrls[process.env.NODE_ENV].BASE_URL
}

methods.forEach(v => {
    http[v] = (url: string, data: any, baseUrl?: string) => {
        const config: AxiosRequestConfig = {
            url,
            method: v,
            baseURL: baseUrl || DEFAULTBASEURL.baseURL
        }
        const instance = axios.create(DEFAULTBASEURL)
        // 请求处理
        instance.interceptors.request.use(
            cfg => {
                const token = localStorage.getItem('token')
                if (!!token) {
                    cfg.headers.common['Authorization'] = 'Bearer ' + token
                }
                return cfg
            },
            error => {
                return Promise.reject(error)
            }
        )
        // 回应处理
        instance.interceptors.response.use(
            res => {
                if (res && res.data) {
                    return res.data
                }
                return res
            },
            error => {
                return Promise.reject(error)
            }
        )

        if (v === 'get' || v === 'delete') {
            config.params = data
        } else {
            config.data = qs.stringify(data)
        }

        return instance
            .request(config)
            .then(res => {
                return res
            })
            .catch(err => {
                // 错误集中处理
                message.destroy()
                if (!!err.response) {
                    const errData = err.response.data
                    message.error(errData.message)
                } else {
                    const msg = err.message === 'Network Error' ? '网络错误' : '未知错误'
                    message.error(msg)
                }
                return Promise.reject(err)
            })
    }
})

export default http
