import React, { useEffect, Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Layout } from 'antd'

import styles from './index.scss'
import SiderMenu from './SiderMenu'
import { useStateValue } from '@store/user/index'
import PageLoading from '@shared/PageLoading'

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
                <LayoutContent>
                    <Suspense fallback={<PageLoading />}>{children}</Suspense>
                </LayoutContent>
            </Layout>
        </Layout>
    )
}

export default Admin
