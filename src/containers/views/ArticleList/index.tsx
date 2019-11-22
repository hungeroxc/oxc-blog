import React, { useEffect, useState } from 'react'
import { Pagination, Empty } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import { getArticleList } from '@services/api'
import PageLoading from '@shared/PageLoading'
import Article, { ArticleItem } from './ArticleItem'
import ListPreview from './ListPreview'
import { decodeQuery } from '@utils/index'

const pageSize = 10

const ArticleList = ({ history, location }: RouteComponentProps) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [articleList, setArticleList] = useState<ArticleItem[]>([])

    // 总数相关
    const [total, setTotal] = useState<number>(0)

    const getList = async (page: number, keyword?: string) => {
        setLoading(true)
        const data = {
            page,
            pageSize,
            keyword
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

    // 改编页码
    const changePage = (p: number) => {
        const urlParams = decodeQuery<{ page: number; keyword: string }>(location.search)
        const params = !!location.search ? { ...urlParams, page: p } : { page: p }
        let url
        Object.keys(params).forEach(key => {
            url = !url ? `?${key}=${params[key]}` : `${url}&${key}=${params[key]}`
        })
        history.push(url)
    }

    useEffect(() => {
        const { page, keyword } = decodeQuery<{ page: number; keyword: string }>(location.search)
        getList(!!page ? page : 1, keyword)
    }, [location.search])

    const { page, keyword } = decodeQuery<{ page: number; keyword: string }>(location.search)

    return (
        <div className={styles.article}>
            <div className={styles.articleListWrapper}>
                {loading ? (
                    <PageLoading />
                ) : (
                    <>
                        {!!articleList.length ? (
                            <div className={styles.articleListContainer}>
                                <div className={styles.articleList}>
                                    {articleList.map(item => (
                                        <Article getTargetArticleId={getTargetArticleId} key={item.id} data={item} />
                                    ))}
                                </div>
                                <ListPreview getTargetArticleId={getTargetArticleId} list={articleList} />
                            </div>
                        ) : (
                            <Empty
                                description={!!keyword ? `未找到标题含有 ${keyword} 的文章` : '暂时还没有文章呢'}
                                className={styles.empty}
                            />
                        )}
                    </>
                )}
            </div>
            {!!articleList.length && (
                <div className={styles.pagination}>
                    <Pagination
                        pageSize={pageSize}
                        onChange={changePage}
                        total={total}
                        current={!!page ? Number(page) : 1}
                    />
                </div>
            )}
        </div>
    )
}

export default withRouter(ArticleList)
