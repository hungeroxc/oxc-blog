import React from 'react'
import { Button } from 'antd'

import styles from './index.scss'

const UserInfo = () => {
    return (
        <div className={styles.headerUserInfo}>
            <>
                <Button ghost type="primary" size="small" style={{ marginRight: 20 }}>
                    登录
                </Button>
                <Button ghost type="danger" size="small">
                    注册
                </Button>
            </>
        </div>
    )
}

export default UserInfo
