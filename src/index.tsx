import React from 'react'
import ReactDOM from 'react-dom'

import Test from '@views/index'

const obj = {
    a: '1'
}

const render = () => {
    ReactDOM.render(<Test a={obj.a} />, document.querySelector('#app'))
}

render()
