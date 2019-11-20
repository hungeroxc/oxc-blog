import React from 'react'
import { Layout, Row, Col } from 'antd'

import styles from './index.scss'
import Nav from './Nav'
import HeaderLeft from './HeaderLeft'
import Search from './Search'
import UserInfo from './UserInfo'

const Header = Layout.Header

const BlogHeader = () => {
    const responsiveLeft = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 }
    return (
        <Header className={styles.headerContainer}>
            <Row>
                <Col {...responsiveLeft}>
                    <HeaderLeft />
                </Col>
                <Col>
                    <Search />
                    <UserInfo />
                    <Nav />
                </Col>
            </Row>
        </Header>
    )
}

export default BlogHeader
