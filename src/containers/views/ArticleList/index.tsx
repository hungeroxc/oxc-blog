import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import { getArticleList } from '@services/api'
import PageLoading from '@shared/PageLoading'
import Article, { ArticleItem } from './ArticleItem'
import ListPreview from './ListPreview'

const pageSize = 10

const ArticleList = ({ history }: RouteComponentProps) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [articleList, setArticleList] = useState<ArticleItem[]>([])

    // 页码相关
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)

    const getList = async () => {
        setLoading(true)
        const data = {
            page,
            pageSize
        }
        try {
            const res = await getArticleList(data)
            setArticleList(res.data.list instanceof Array ? res.data.list : [])
            setTotal(res.data.total)
            setLoading(false)
        } catch (error) {}
    }

    // 跳转文章详情
    const getTargetArticleId = (id: number) => {
        history.push(`/article-detail/${id}`)
    }

    useEffect(() => {
        getList()
    }, [page])

    return (
        <div className={styles.article}>
            <div className={styles.articleListWrapper}>
                {loading ? (
                    <PageLoading />
                ) : (
                    <div className={styles.articleListContainer}>
                        <div className={styles.articleList}>
                            {articleList.map(item => (
                                <Article getTargetArticleId={getTargetArticleId} key={item.id} data={item} />
                            ))}
                        </div>
                        <ListPreview getTargetArticleId={getTargetArticleId} list={articleList} />
                    </div>
                )}
            </div>
            <div className={styles.pagination}>
                <Pagination pageSize={pageSize} onChange={(p: number) => setPage(p)} total={total} current={page} />
            </div>
        </div>
    )
}

export default withRouter(ArticleList)
