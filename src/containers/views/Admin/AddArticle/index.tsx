import React, { useState } from 'react'
import { Button } from 'antd'

import styles from './index.scss'
import EditArticle from '@shared/EditArticle'

const AddArticle = () => {
    const [title, setTitle] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')

    const saveArticle = () => {
        console.log(title, inputValue)
    }

    return (
        <div className={styles.addArticle}>
            <div className={styles.editArticle}>
                <EditArticle
                    inputValue={inputValue}
                    title={title}
                    changeInputValue={setInputValue}
                    changeTitle={setTitle}
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
