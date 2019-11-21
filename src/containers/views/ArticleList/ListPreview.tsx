import React from 'react'
import { Divider } from 'antd'

import { ArticleItem } from './ArticleItem'
import styles from './index.scss'

interface IProps {
    list: ArticleItem[]
    getTargetArticleId: (id: number) => void
}

const ListPreview = ({ list, getTargetArticleId }: IProps) => {
    return (
        <ul className={styles.preView}>
            <Divider>文章列表</Divider>
            {list.map(item => (
                <li onClick={() => getTargetArticleId(item.id)} className={styles.previewTitle} key={item.id}>
                    {item.title}
                </li>
            ))}
        </ul>
    )
}

export default ListPreview
