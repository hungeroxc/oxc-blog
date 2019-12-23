import React, { useRef, useEffect } from 'react'
import { Controlled as ReactCodeMirror } from 'react-codemirror2'
import { message } from 'antd'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'

import { qiniuUpload } from '@utils/index'

interface IProps {
    value: string
    onChangeInput: (v: string) => void
}

const CodeMirror = ({ value, onChangeInput }: IProps) => {
    const codeMirrorContainer = useRef(null)
    const codeMirror = useRef(null)

    const onChange = (editor: CodeMirror.Editor, data: CodeMirror.EditorChange, v: string) => {
        onChangeInput(v)
    }

    // 把获取到的url插进内容中
    const getImgUrl = (url: string) => {
        const v = codeMirror.current.editor.getValue()
        const lineFeed = v.length > 0 ? '\n' : ''
        const newValue = `${v}${lineFeed}![](${url})`
        onChangeInput(newValue)
    }

    // 监听黏贴
    const listenPaste = (e: ClipboardEvent) => {
        const clipboard = e.clipboardData
        if (!clipboard.items || !clipboard.items.length) {
            return
        }
        if (process.env.APP_ENV === 'qa') {
            return message.error('测试环境暂不支持黏贴图片')
        }
        const data = clipboard.items[0]
        if (clipboard.items[0].type === 'image/png') {
            const imgFile = data.getAsFile()
            qiniuUpload(imgFile, getImgUrl)
        }
    }

    useEffect(() => {
        const ele: HTMLElement = codeMirrorContainer.current
        if (!!ele) {
            ele.addEventListener('paste', listenPaste)
        }
        return () => {
            ele.removeEventListener('paste', listenPaste)
        }
    }, [])

    // 配置项
    const options = {
        mode: 'markdown',
        theme: 'monokai',
        tabSize: 1,
        indentWithTabs: true,
        autofocus: true
    }
    return (
        <div ref={codeMirrorContainer}>
            <ReactCodeMirror ref={codeMirror} value={value} options={options} onBeforeChange={onChange} />
        </div>
    )
}

export default CodeMirror
