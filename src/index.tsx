import React, { Component, ComponentProps } from 'react'
import ReactDOM from 'react-dom'
import hljs from 'highlight.js'
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript' // highlight类型文件中无此文件签名导致严格模式下报错
import 'highlight.js/styles/atom-one-light.css'
import fundebug from 'fundebug-javascript'

import Provider from '@store/index'
import App from '@views/App'

// icon样式
import './styles/icon.scss'

hljs.registerLanguage('javascript', javascript)

fundebug.init({
    apikey: 'bea8b252e67404b2b6118505f81015811ec957841a06a0919fa54e0a58b49cfb'
})

// 针对react16之后版本，若react本身报错的话需要使用该组件
class ErrorBoundary extends Component<ComponentProps<any>, { hasError: boolean }> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error: Error, info: any) {
        this.setState({ hasError: true })
        // 将component中的报错发送到Fundebug
        fundebug.notifyError(error, {
            metaData: {
                info
            }
        })
    }

    render() {
        if (this.state.hasError) {
            return null
            // Note: 也可以在出错的component处展示出错信息，返回自定义的结果。
        }
        return this.props.children
    }
}

const render = () => {
    ReactDOM.render(
        <ErrorBoundary>
            <Provider>
                <App />
            </Provider>
        </ErrorBoundary>,
        document.querySelector('#app')
    )
}

render()
