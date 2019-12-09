import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import classnames from 'classnames'
import { Divider } from 'antd'

import { getArticleById } from '@services/api'
import styles from './index.scss'
import PageLoading from '@shared/PageLoading'
import { markdownToHtml } from '@utils/index'
import { ArticleItem } from './../ArticleList/ArticleItem'
import ArticleAnchor from './ArticleAnchor'
import Icon from '@shared/Icon'
import ArticleTags from '@shared/ArticleTags'
import Discuss from '@shared/Discuss'
import { useTagStore } from '@store/index'
import { getTagColor } from '@utils/index'

const ArticleDetail = ({ match }: RouteComponentProps<{ id: string }>) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<ArticleItem>(null)
    const [content, setContent] = useState<string>('')

    const [tempTagList, setTempTagList] = useState<ITagStore.TagItem[]>([])

    const {
        state: { tagList, isGetTagList }
    } = useTagStore()

    // 获取文章详情
    const getArticleDetail = async () => {
        const { id } = match.params
        setLoading(true)
        try {
            const res = await getArticleById({ id })
            setData(res.data)
            setContent(markdownToHtml(res.data.content))
            setLoading(false)
        } catch (error) {}
    }

    useEffect(() => {
        getArticleDetail()
    }, [match.params.id])

    useEffect(() => {
        if (!loading && isGetTagList) {
            setTempTagList(getTagColor(tagList, data.tags))
        }
    }, [isGetTagList, loading])

    return (
        <div className={styles.articleDetail}>
            {loading || !isGetTagList ? (
                <PageLoading />
            ) : (
                <>
                    <div className={styles.detailContainer}>
                        <div className={styles.detailContent}>
                            <div className={styles.header}>
                                <h1 className={styles.title}>{data.title}</h1>
                                <div className={styles.otherInfo}>
                                    <div className={styles.viewCountAndDicuss}>
                                        <div className={styles.item}>
                                            <Icon
                                                className={styles.icon}
                                                width={20}
                                                height={20}
                                                color="#828a8c"
                                                id="yanjing"
                                            />
                                            {data.viewCount}
                                        </div>
                                    </div>
                                    <Divider type="vertical" />
                                    {!!tempTagList.length && (
                                        <div className={styles.tags}>
                                            <Icon
                                                className={styles.tagIcon}
                                                id="tags"
                                                width={16}
                                                height={16}
                                                color="#838a8c"
                                            />
                                            <ArticleTags tags={tempTagList} />
                                        </div>
                                    )}

                                    <Divider type="vertical" />
                                    <div>更新于:&nbsp; {data.updatedAt}</div>
                                </div>
                            </div>
                            <div
                                className={classnames(styles.content, styles.markdown)}
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                        <div className={styles.articleAnchor}>
                            <ArticleAnchor content={content} />
                        </div>
                    </div>
                    <Discuss articleData={data} />
                </>
            )}
        </div>
    )
}

export default withRouter(ArticleDetail)
