import React from 'react'
import { Layout, Row, Col } from 'antd'

import styles from './index.scss'
import Nav from './Nav'
import HeaderLeft from './HeaderLeft'
import Search from './Search'
import UserInfo from './UserInfo'

const Header = () => {
    const left = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 }
    return (
        <Layout className={styles.headerContainer}>
            <Row>
                <Col {...left}>
                    <HeaderLeft />
                </Col>
                <Col>
                    <Search />
                    <UserInfo />
                    <Nav />
                </Col>
            </Row>
        </Layout>
    )
}

export default Header
