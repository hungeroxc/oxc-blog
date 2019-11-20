import React from 'react'
import ReactDOM from 'react-dom'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-light.css'

import Provider from '@store/index'
import App from '@views/App'

// icon
import '@utils/iconfont.min'
import './styles/icon.scss'

hljs.registerLanguage('javascript', javascript)

const render = () => {
    ReactDOM.render(
        <Provider>
            <App />
        </Provider>,
        document.querySelector('#app')
    )
}

render()
