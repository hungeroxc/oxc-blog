import React, { useState } from 'react'
import { Input, Button, Icon as IconAntd, message } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import Icon from '@shared/Icon'
import { login } from '@services/api'
import { useDispatch } from '@store/user/index'

const Login = ({ history }: RouteComponentProps) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch()

    const gotoAdmin = async () => {
        try {
            const res = await login({
                username,
                password
            })
            if (res.data.auth === 1) {
                return message.error('抱歉，您的权限不足')
            } else if (res.data.auth === 2) {
                dispatch({ type: 'USER_LOGIN', payload: res.data })
                localStorage.setItem('token', res.data.token)
                history.push('/admin')
            }
        } catch (error) {}
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <Icon fontSize={1000} className={styles.loginIcon} id="React" />
                <Input
                    size="large"
                    prefix={<IconAntd type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="username"
                    placeholder="请输入用户名"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    style={{ marginBottom: 25 }}
                />
                <Input
                    size="large"
                    prefix={<IconAntd type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="password"
                    placeholder="请输入密码"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    style={{ marginBottom: 25 }}
                />
                <Button onClick={gotoAdmin} style={{ width: '100%' }} type="primary" size="large">
                    登录
                </Button>
            </div>
        </div>
    )
}

export default withRouter(Login)
