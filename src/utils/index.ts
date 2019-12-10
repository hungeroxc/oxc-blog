import marked from 'marked'
import hljs from 'highlight.js'
import { filterXSS } from 'xss'
import * as qiniu from 'qiniu-js'
import { message } from 'antd'

import { getQiniuToken } from '@services/api'
import { QN_URL_PREFIX } from '@constants/index'

export const markdownToHtml = (text: string, isGuardXss = false) => {
    return marked(isGuardXss ? filterXSS(text) : text, {
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: (code: string) => {
            return hljs.highlightAuto(code).value
        }
    })
}

export const decodeQuery = <T>(value: string): T => {
    const params = {} as T
    const paramsStr = value.replace(/\.*\?/, '')
    paramsStr.split('&').forEach(v => {
        const d = v.split('=')
        params[d[0]] = d[1]
    })
    return params
}

export const getTagColor = (tagList: ITagStore.TagItem[], tags: { id: number; value: string }[]) => {
    const list = []
    tagList.forEach(item => {
        tags.forEach(v => {
            if (v.id === item.id) {
                list.push(item)
            }
        })
    })
    return list
}

// 七牛上传
export const qiniuUpload = async (file: File, callback: (url: string) => void) => {
    const res = await getQiniuToken()
    const data = { token: res.data.token, key: '' }
    const { name } = file
    // 文件名处理，避免同名加个时间戳
    if (!!name) {
        let newName = name
        if (name.includes('.')) {
            const id = `_${new Date().getTime()}`
            const index = name.lastIndexOf('.')
            newName = name.slice(0, index) + id + name.slice(index, name.length)
        }
        data.key = newName
    }

    const uploadSuccess = (res: QiniuRes) => {
        if (!!res && res.key) {
            callback(QN_URL_PREFIX + res.key)
        }
    }

    const uploadFail = () => {
        message.error('上传失败, 请再试一次')
    }

    const observable = qiniu.upload(file, data.key, data.token, { fname: data.key }, { region: qiniu.region.z2 })
    observable.subscribe(() => {}, uploadFail, uploadSuccess)
}
