import React, { useState, useEffect } from 'react'
import { Input } from 'antd'

import styles from './index.scss'
import Editor from './Editor'
import Tags from './Tags'
import { useTagStore } from '@store/index'

interface IProps {
    changeInputValue: (v: string) => void
    changeTitle: (title: string) => void
    title: string
    inputValue: string
    selectedTags: string[]
    setSelectedTags: (tags: string[]) => void
}

const EditArticle = ({ changeInputValue, changeTitle, title, inputValue, selectedTags, setSelectedTags }: IProps) => {
    const [tempTagList, setTempTagList] = useState<string[]>([])

    const {
        state: { tagList }
    } = useTagStore()

    // 从store中拿到所有tag

    useEffect(() => {
        setTempTagList(tagList.map(tag => tag.value))
    }, [])

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
            <Tags
                tempTagList={tempTagList}
                setTempTagList={setTempTagList}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
            <Editor onChange={changeInputValue} value={inputValue} className={styles.editor} />
        </div>
    )
}

export default EditArticle
