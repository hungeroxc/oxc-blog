import React from 'react'
import { Divider } from 'antd'
import classnames from 'classnames'

import { markdownToHtml } from '@utils/index'
import styles from './index.scss'

export interface ArticleItem {
    content: string
    title: string
    id: number
    createdAt: string
}

interface IProps {
    data: ArticleItem
    getTargetArticleId: (id: number) => void
}

const ArticleItem = ({ data, getTargetArticleId }: IProps) => {
    const { title, content, id } = data
    return (
        <div className={styles.articleItem}>
            <Divider orientation="left">
                <span onClick={() => getTargetArticleId(id)} className={styles.title}>
                    {title}
                </span>
                <span className={styles.createTime}>{data.createdAt}</span>
            </Divider>
            <div
                className={classnames(styles.description, styles.markdown)}
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
                onClick={() => getTargetArticleId(id)}
            />
        </div>
    )
}

export default ArticleItem
