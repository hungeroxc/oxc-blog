import React from 'react'
import { Button } from 'antd'

import { test } from '@services/api'

const App = () => {
    return (
        <section className="bbb">
            <div className="aaa">123123123</div>
            <Button onClick={() => test()}>test</Button>
        </section>
    )
}

export default App
