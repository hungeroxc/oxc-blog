import React, { useState, useRef } from 'react'
import { Input, Tag, Icon } from 'antd'

import styles from './../index.scss'

const { CheckableTag } = Tag

interface IProps {
    selectedTags: string[]
    setSelectedTags: (tags: string[]) => void
    tempTagList: string[]
    setTempTagList: (tags: string[]) => void
}

const Tags = ({ tempTagList, setTempTagList, selectedTags, setSelectedTags }: IProps) => {
    const inputRef = useRef<Input>(null)

    const [inputVisible, setInputVisible] = useState<boolean>(false)
    // 输入的新标签
    const [newTagValue, setNewTagValue] = useState<string>('')

    // 展示新增标签输入框
    const showInput = () => {
        setInputVisible(true)
        setTimeout(() => {
            inputRef && inputRef.current.focus()
        }, 50)
    }

    // 添加标签
    const addTag = () => {
        if (!!newTagValue && !tempTagList.find(t => t === newTagValue)) {
            setTempTagList([...tempTagList, newTagValue])
            setSelectedTags([...selectedTags, newTagValue])
            setNewTagValue('')
        }
        setInputVisible(false)
        setNewTagValue('')
    }

    // 取消或者选中点击的标签
    const cacelSelectedTag = (checked: boolean, value: string) => {
        checked ? setSelectedTags([...selectedTags, value]) : setSelectedTags(selectedTags.filter(v => v !== value))
    }

    return (
        <div className={styles.tags}>
            <span className={styles.label}>标签:</span>
            {tempTagList.map(value => {
                return (
                    <CheckableTag
                        onChange={(checked: boolean) => cacelSelectedTag(checked, value)}
                        checked={!!selectedTags.find(v => v === value)}
                        key={value}
                    >
                        {value}
                    </CheckableTag>
                )
            })}
            <Input
                ref={inputRef}
                style={{ width: 78, display: inputVisible ? 'inline' : 'none' }}
                type="text"
                size="small"
                onBlur={addTag}
                value={newTagValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTagValue(e.target.value)}
            />
            {!inputVisible && (
                <Tag onClick={showInput} className={styles.newTagBtn}>
                    <Icon type="plus" />
                    New Tag
                </Tag>
            )}
        </div>
    )
}

export default Tags
