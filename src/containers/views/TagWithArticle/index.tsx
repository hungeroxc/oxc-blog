import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Timeline } from 'antd'

import { getArticleList } from '@services/api'
import PageLoading from '@shared/PageLoading'
import styles from './index.scss'

interface ListItem {
    createdAt: string
    id: number
    title: string
}

const TimelineItem = Timeline.Item

const TagWithArticle = ({ match, history }: RouteComponentProps<{ tag: string }>) => {
    const { params } = match

    const [list, setList] = useState<ListItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getList = async () => {
        setLoading(true)
        try {
            const res = await getArticleList({
                tag: params.tag
            })
            setList(res.data.list instanceof Array ? res.data.list : [])
            setLoading(false)
        } catch (error) {}
    }

    // 跳转详情
    const gotoArticleDetail = (id: number) => {
        history.push(`/article-detail/${id}`)
    }

    useEffect(() => {
        getList()
    }, [])
    return (
        <div className={styles.tagWithArticleWrapper}>
            {loading ? (
                <PageLoading className={styles.loading} />
            ) : (
                <div className={styles.timelineWrapper}>
                    <Timeline>
                        <TimelineItem>
                            <h1 className={styles.listTitle}>{params.tag}</h1>
                            <br />
                        </TimelineItem>
                        {list.map(item => (
                            <TimelineItem key={item.id}>
                                <div className={styles.infoWrapper}>
                                    <span className={styles.createdAt}>{item.createdAt.slice(5, 10)}</span>
                                    <div onClick={() => gotoArticleDetail(item.id)} className={styles.title}>
                                        {item.title}
                                    </div>
                                </div>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </div>
            )}
        </div>
    )
}

export default withRouter(TagWithArticle)
