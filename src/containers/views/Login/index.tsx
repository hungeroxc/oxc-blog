import React from 'react'
import { Input, Button, Icon as IconAntd } from 'antd'

import styles from './index.scss'
import Icon from '@shared/Icon'

const Login = () => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <Icon fontSize={1000} className={styles.loginIcon} id="icon-React" />
                <Input
                    size="large"
                    prefix={<IconAntd type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="username"
                    placeholder="请输入用户名"
                    style={{ marginBottom: 25 }}
                />
                <Input
                    size="large"
                    prefix={<IconAntd type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="password"
                    placeholder="请输入密码"
                    style={{ marginBottom: 25 }}
                />
                <Button style={{ width: '100%' }} type="primary" size="large">
                    登录
                </Button>
            </div>
        </div>
    )
}

export default Login
