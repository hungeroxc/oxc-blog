import React, { useState } from 'react'
import { Button, Dropdown, Avatar, Menu } from 'antd'

import styles from './index.scss'
import AuthModal from './AuthModal'
import { useStateValue, useDispatch } from '@store/user/index'

const MenuItem = Menu.Item

const UserInfo = () => {
    const [authVisible, setAuthVisible] = useState<boolean>(false)
    // 弹框类型
    const [authModalType, setAuthModalType] = useState<string>('login')

    const { userInfo } = useStateValue()

    const dispatch = useDispatch()

    const triggerAuthModal = (visible: boolean, type?: string) => {
        setAuthVisible(visible)
        setAuthModalType(type)
    }

    // 退出登录
    const logout = () => {
        dispatch({ type: 'USER_LOGIN_OUT' })
    }

    const renderMenu = () => {
        return (
            <Menu>
                {userInfo.auth === 2 && <MenuItem>管理中心</MenuItem>}
                <MenuItem onClick={logout}>退出登录</MenuItem>
            </Menu>
        )
    }

    return (
        <div className={styles.headerUserInfo}>
            {!!userInfo ? (
                <Dropdown trigger={['click']} placement="bottomCenter" overlay={renderMenu()}>
                    <Avatar className={styles.headerAvatar} size="large">
                        {userInfo.username}
                    </Avatar>
                </Dropdown>
            ) : (
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
            )}
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
