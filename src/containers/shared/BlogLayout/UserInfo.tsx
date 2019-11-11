import React, { useState } from 'react'
import { Button } from 'antd'

import styles from './index.scss'
import AuthModal from './AuthModal'

const UserInfo = () => {
    const [authVisible, setAuthVisible] = useState<boolean>(false)
    // 弹框类型
    const [authModalType, setAuthModalType] = useState<string>('login')

    const triggerAuthModal = (visible: boolean, type?: string) => {
        setAuthVisible(visible)
        setAuthModalType(type)
    }

    return (
        <div className={styles.headerUserInfo}>
            <>
                <Button
                    onClick={() => triggerAuthModal(true, 'login')}
                    ghost
                    type="primary"
                    size="small"
                    style={{ marginRight: 20 }}
                >
                    登录
                </Button>
                <Button onClick={() => triggerAuthModal(true, 'register')} ghost type="danger" size="small">
                    注册
                </Button>
            </>
            <AuthModal
                triggerAuthModal={triggerAuthModal}
                closeModal={() => setAuthVisible(false)}
                authModalType={authModalType}
                visible={authVisible}
            />
        </div>
    )
}

export default UserInfo
