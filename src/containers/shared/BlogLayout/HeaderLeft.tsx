import React from 'react'

import styles from './index.scss'
import Icon from '@shared/Icon'

const HeaderLeft = () => {
    return (
        <div className={styles.headLeft}>
            <Icon className={styles.icon} width={20} height={20} id="bokezhuanjia" />
            大春春的s博客
        </div>
    )
}

export default HeaderLeft
