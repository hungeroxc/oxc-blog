import React from 'react'
import { Layout, Col, Row } from 'antd'

import Nav from './Nav'

const BlogLayout: React.FC = ({ children }) => {
    const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

    return (
        <Layout>
            <Nav />
            <Row>
                <Col {...siderLayout}>
                    <div>123</div>
                </Col>
                <Col {...contentLayout}>
                    <div>{children}</div>
                </Col>
            </Row>
        </Layout>
    )
}

export default BlogLayout
