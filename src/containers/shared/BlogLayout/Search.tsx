import React from 'react'
import { Input, Icon, Row, Col } from 'antd'

import styles from './index.scss'

const Search = () => {
    return (
        <Row className={styles.searchBox}>
            <Col>
                <Icon className={styles.antion} type="search" />
                <Input className={styles.headerSearch} placeholder="搜索文章标题" />
            </Col>
        </Row>
    )
}

export default Search
