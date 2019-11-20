import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import classnames from 'classnames'

import { getArticleById } from '@services/api'
import styles from './index.scss'
import PageLoading from '@shared/PageLoading'
import { markdownToHtml } from '@utils/index'
import { ArticleItem } from './../ArticleList/ArticleItem'

const ArticleDetail = ({ match }: RouteComponentProps<{ id: string }>) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<ArticleItem>(null)
    const [content, setContent] = useState<string>('')

    // 获取文章详情
    const getArticleDetail = async () => {
        const { id } = match.params
        try {
            const res = await getArticleById({ id })
            setData(res.data)
            setContent(markdownToHtml(res.data.content))
            setLoading(false)
        } catch (error) {}
    }

    useEffect(() => {
        getArticleDetail()
    }, [])

    return (
        <div className={styles.articleDetail}>
            {loading ? (
                <PageLoading />
            ) : (
                <>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{data.title}</h1>
                    </div>
                    <div
                        className={classnames(styles.content, styles.markdown)}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </>
            )}
        </div>
    )
}

export default withRouter(ArticleDetail)
