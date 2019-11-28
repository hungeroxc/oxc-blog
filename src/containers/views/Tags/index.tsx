import React from 'react'
import { Tag, Badge } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import PageLoading from '@shared/PageLoading'
import styles from './index.scss'
import { useStateValue as useTagsState } from '@store/tag/index'
import { TagItem } from '@store/tag/types'

const Tags = ({ history }: RouteComponentProps) => {
    const { tagList, isGetTagList } = useTagsState()

    // 跳转到相对于该标签的文章列表页
    const showTagWithArticle = (tag: TagItem) => {
        history.push(`/tag/${tag.value}`)
    }

    return (
        <div className={styles.tagPage}>
            {isGetTagList ? (
                <div className={styles.tagsWrapper}>
                    <div className={styles.header}>
                        <div className={styles.title}>Tags</div>
                        <div className={styles.info}>当前一共有{tagList.length}个标签</div>
                    </div>
                    <div className={styles.tagsWrapper}>
                        {tagList.map(tag => (
                            <Badge className={styles.badge} count={tag.count} key={tag.id}>
                                <Tag
                                    onClick={() => showTagWithArticle(tag)}
                                    className={styles.tagItem}
                                    color={tag.color}
                                >
                                    {tag.value}
                                </Tag>
                            </Badge>
                        ))}
                    </div>
                </div>
            ) : (
                <PageLoading />
            )}
        </div>
    )
}

export default withRouter(Tags)
