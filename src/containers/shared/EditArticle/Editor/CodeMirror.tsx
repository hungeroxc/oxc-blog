import React, { useRef } from 'react'
import { Controlled as ReactCodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'

interface IProps {
    value: string
    onChangeInput: (v: string) => void
}

const CodeMirror = ({ value, onChangeInput }: IProps) => {
    const codeMirror = useRef(null)

    const onChange = (editor, data, v) => {
        onChangeInput(v)
    }

    // 配置项
    const options = {
        mode: 'markdown',
        theme: 'monokai',
        tabSize: 2,
        indentWithTabs: true,
        autofocus: true
    }
    return (
        <div ref={codeMirror}>
            <ReactCodeMirror value={value} options={options} onBeforeChange={onChange} />
        </div>
    )
}

export default CodeMirror
