import React, { useEffect, useState } from 'react'
import { Pagination, Empty } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import PageLoading from '@shared/PageLoading'
import Article, { ArticleItem } from './ArticleItem'
import ListPreview from './ListPreview'
import { decodeQuery } from '@utils/index'
import { useGetListData } from '@utils/hooks'
import { getArticleList } from '@services/api'

const pageSize = 10

const ArticleList = ({ history, location }: RouteComponentProps) => {
    const [params, setParams] = useState<FetchParams.GetArticleList>(null)
    const [cancelRequire, setCancelRequire] = useState<boolean>(true)

    const { list, loading, total } = useGetListData<ArticleItem, FetchParams.GetArticleList>(
        getArticleList,
        params,
        cancelRequire
    )

    const getList = async (page: number, keyword?: string) => {
        const data = {
            page,
            pageSize,
            keyword
        }
        setCancelRequire(false)
        setParams(data)
    }

    // 跳转文章详情
    const getTargetArticleId = (id: number) => {
        history.push(`/article-detail/${id}`)
    }

    // 改变页码
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
                        {!!list.length ? (
                            <div className={styles.articleListContainer}>
                                <div className={styles.articleList}>
                                    {list.map(item => (
                                        <Article getTargetArticleId={getTargetArticleId} key={item.id} data={item} />
                                    ))}
                                </div>
                                <ListPreview getTargetArticleId={getTargetArticleId} list={list} />
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
            {!!list.length && (
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
