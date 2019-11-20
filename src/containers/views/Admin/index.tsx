import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Layout } from 'antd'

import styles from './index.scss'
import SiderMenu from './SiderMenu'
import { useStateValue } from '@store/user/index'

const LayoutSider = Layout.Sider

const LayoutContent = Layout.Content

interface IProps {
    children?: React.ReactNode
}

const Admin = ({ children, history }: IProps & RouteComponentProps) => {
    const { userInfo } = useStateValue()

    useEffect(() => {
        if (!userInfo || userInfo.auth === 1) {
            history.replace('/login')
        }
    }, [])

    return (
        <Layout className={styles.adminContainer}>
            <LayoutSider>
                <SiderMenu />
            </LayoutSider>
            <Layout>
                <LayoutContent>{children}</LayoutContent>
            </Layout>
        </Layout>
    )
}

export default Admin
