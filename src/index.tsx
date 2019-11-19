import React from 'react'
import ReactDOM from 'react-dom'

import Provider from '@store/index'
import App from '@views/App'

const render = () => {
    ReactDOM.render(
        <Provider>
            <App />
        </Provider>,
        document.querySelector('#app')
    )
}

render()
