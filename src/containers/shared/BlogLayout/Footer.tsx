import React from 'react'

import styles from './index.scss'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.rightNumber}>
                <a
                    style={{ color: '#a1a1a3' }}
                    // eslint-disable-next-line react/jsx-no-target-blank
                    target="_blank"
                    href="http://www.beian.miit.gov.cn/"
                >
                    备案号: 粤ICP备19150126号
                </a>
            </div>
            <div className={styles.rightNumber}>备案主体: 欧晓春</div>
            <div className={styles.rightNumber}>Copyright © 2020 欧晓春 版权所有</div>
        </div>
    )
}

export default Footer
