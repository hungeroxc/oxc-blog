import React from 'react'
import { Tag } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import classnames from 'classnames'

import styles from './index.scss'

interface IProps {
    tags: ITagStore.TagItem[]
    className?: string
}

const ArticleTags = ({ tags, history, className }: IProps & RouteComponentProps) => {
    const gotoTagWithArticleList = (value: string) => {
        history.push(`/tag/${value}`)
    }

    return (
        <div className={classnames(styles.tagsWrapper, className)}>
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
