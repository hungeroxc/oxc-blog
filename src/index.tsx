import React from 'react'
import ReactDOM from 'react-dom'

import App from '@views/App'

const render = () => {
    ReactDOM.render(<App />, document.querySelector('#app'))
}

render()
