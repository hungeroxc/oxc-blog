import React from 'react'
import { Tag } from 'antd'

import { TagItem } from '@store/tag/types'
import styles from './index.scss'

interface IProps {
    tags: TagItem[]
}

const ArticleTags = ({ tags }: IProps) => {
    return (
        <div className={styles.tagsWrapper}>
            {tags.map(tag => (
                <Tag color={tag.color} className={styles.tagItem} key={tag.id}>
                    {tag.value}
                </Tag>
            ))}
        </div>
    )
}

export default ArticleTags
