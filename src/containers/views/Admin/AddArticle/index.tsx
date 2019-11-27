import React, { useState } from 'react'
import { Button, message } from 'antd'

import styles from './index.scss'
import EditArticle from '@shared/EditArticle'
import { createArticle } from '@services/api'

const AddArticle = () => {
    const [title, setTitle] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')
    // 标签
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const saveArticle = async () => {
        if (!title || !inputValue) {
            return message.error('文章的标题和内容都是必须的')
        }

        const data = {
            title,
            content: inputValue,
            tags: selectedTags
        }
        try {
            await createArticle(data)
            setTitle('')
            setInputValue('')
            setSelectedTags([])
            message.success('新建文章成功')
        } catch (error) {}
    }

    return (
        <div className={styles.addArticle}>
            <div className={styles.editArticle}>
                <EditArticle
                    inputValue={inputValue}
                    title={title}
                    changeInputValue={setInputValue}
                    changeTitle={setTitle}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            </div>
            <div className={styles.footer}>
                <Button onClick={saveArticle} type="primary">
                    保存
                </Button>
            </div>
        </div>
    )
}

export default AddArticle
