import React from 'react'
import ReactDOM from 'react-dom'

import App from '@views/App'
import Test from '@views/Test'

const render = () => {
    ReactDOM.render(
        <div>
            <App />
            <Test />
        </div>,
        document.querySelector('#app')
    )
}

render()
