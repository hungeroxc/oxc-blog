import React from 'react'

import styles from './index.scss'

interface IProps {
    a: number
}

const Test = ({ a }: IProps) => {
    return <div className={styles.test}>{a}</div>
}

export default Test
