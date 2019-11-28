import React from 'react'
import { Tag } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { TagItem } from '@store/tag/types'
import styles from './index.scss'

interface IProps {
    tags: TagItem[]
}

const ArticleTags = ({ tags, history }: IProps & RouteComponentProps) => {
    const gotoTagWithArticleList = (value: string) => {
        history.push(`/tag/${value}`)
    }

    return (
        <div className={styles.tagsWrapper}>
            {tags.map(tag => (
                <Tag
                    onClick={() => gotoTagWithArticleList(tag.value)}
                    color={tag.color}
                    className={styles.tagItem}
                    key={tag.id}
                >
                    {tag.value}
                </Tag>
            ))}
        </div>
    )
}

export default withRouter(ArticleTags)
