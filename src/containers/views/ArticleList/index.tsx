import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'

import styles from './index.scss'
import { getArticleList } from '@services/api'
import PageLoading from '@shared/PageLoading'
import Article, { ArticleItem } from './ArticleItem'

const pageSize = 10

const ArticleList = () => {
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
            console.log(res)
            setArticleList(res.data.list instanceof Array ? res.data.list : [])
            setTotal(res.data.total)
            setLoading(false)
        } catch (error) {}
    }

    // 跳转文章详情
    const getTargetArticleId = (id: number) => {
        console.log(id)
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
                    <div className={styles.articleList}>
                        {articleList.map(item => (
                            <Article getTargetArticleId={getTargetArticleId} key={item.id} data={item} />
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.pagination}>
                <Pagination pageSize={pageSize} onChange={(p: number) => setPage(p)} total={total} current={page} />
            </div>
        </div>
    )
}

export default ArticleList
