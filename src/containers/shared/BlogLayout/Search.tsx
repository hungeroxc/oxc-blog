import React, { useState } from 'react'
import { Input, Icon, Row, Col } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'

const Search = ({ history }: RouteComponentProps) => {
    const [keyword, setKeyword] = useState<string>('')

    const searchArticle = () => {
        console.log(keyword)
        history.push(`/?page=1&keyword=${keyword}`)
    }

    return (
        <Row className={styles.searchBox}>
            <Col>
                <Icon className={styles.antion} type="search" />
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                    value={keyword}
                    className={styles.headerSearch}
                    placeholder="搜索文章标题"
                    onPressEnter={searchArticle}
                />
            </Col>
        </Row>
    )
}

export default withRouter(Search)
