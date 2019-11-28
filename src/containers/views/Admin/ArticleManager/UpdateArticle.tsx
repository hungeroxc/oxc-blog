import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

import { ArticleItem } from '@views/ArticleList/ArticleItem'
import styles from './index.scss'
import Editor from '@shared/EditArticle'
import { updateArticle as updateArticleApi } from '@services/api'

interface IProps {
    editTarget: ArticleItem
    triggerShowEditArticle: (isShow: boolean, targetArticle?: ArticleItem) => void
    getArticleList: (initPage?: boolean) => void
}

const updateArticle = ({ editTarget, triggerShowEditArticle, getArticleList }: IProps) => {
    const [title, setTitle] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')
    // 标签
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    // 保存
    const save = async () => {
        try {
            const data = {
                title,
                content: inputValue,
                id: editTarget.id,
                tags: selectedTags
            }
            await updateArticleApi(data)
            triggerShowEditArticle(false)
            getArticleList()
        } catch (error) {}
    }

    // 初始化内容
    useEffect(() => {
        setTitle(editTarget.title)
        setInputValue(editTarget.content)
        setSelectedTags(editTarget.tags.map(item => item.value))
    }, [])

    return (
        <div className={styles.updateArticle}>
            <div className={styles.editor}>
                <Editor
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    changeTitle={setTitle}
                    changeInputValue={setInputValue}
                    title={title}
                    inputValue={inputValue}
                />
            </div>
            <div className={styles.footer}>
                <Button onClick={() => triggerShowEditArticle(false)} className={styles.operationItem}>
                    取消
                </Button>
                <Button onClick={save} className={styles.operationItem} type="primary">
                    保存
                </Button>
            </div>
        </div>
    )
}

export default updateArticle
