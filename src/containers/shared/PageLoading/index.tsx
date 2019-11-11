import React from 'react'
import { Spin } from 'antd'
import classnames from 'classnames'

import styles from './index.scss'

interface IProps {
    className?: string
}

const PageLoading = ({ className }: IProps) => {
    return (
        <div className={classnames(styles.pageLoading, className)}>
            <Spin />
        </div>
    )
}

export default PageLoading
