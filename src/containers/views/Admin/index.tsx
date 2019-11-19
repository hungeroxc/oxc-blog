import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import { useStateValue } from '@store/user/index'
import SiderMenu from './SiderMenu'

const LayoutSider = Layout.Sider

const LayoutContent = Layout.Content

const Admin = ({ history }: RouteComponentProps) => {
    const { userInfo } = useStateValue()

    useEffect(() => {
        if (userInfo.auth !== 2) {
            history.push('/login')
        }
    }, [])

    return (
        <Layout className={styles.adminContainer}>
            <LayoutSider>
                <SiderMenu />
            </LayoutSider>
            <Layout>
                <LayoutContent>
                    <div>123</div>
                </LayoutContent>
            </Layout>
        </Layout>
    )
}

export default withRouter(Admin)
