import React from 'react'
import { Input } from 'antd'

import styles from './index.scss'
import Editor from './Editor'

interface IProps {
    changeInputValue: (v: string) => void
    changeTitle: (title: string) => void
    title: string
    inputValue: string
}

const EditArticle = ({ changeInputValue, changeTitle, title, inputValue }: IProps) => {
    return (
        <div className={styles.editArticle}>
            <div className={styles.header}>
                <div className={styles.setInfo}>
                    <span className={styles.label}>标题:</span>
                    <Input
                        value={title}
                        onChange={e => changeTitle(e.target.value)}
                        placeholder="请输入标题"
                        className={styles.titleInput}
                    />
                </div>
            </div>
            <Editor onChange={changeInputValue} value={inputValue} className={styles.editor} />
        </div>
    )
}

export default EditArticle
