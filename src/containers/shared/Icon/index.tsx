import React from 'react'

/**
 * 为何需要这个组件?
 * 原因是考虑到之前项目中采用引入单个svg文件的方式展示icon，
 * 但同时由于涉及规范的不标准，导致相同icon重复设计多次，
 * 产生多个相同功能但是不同样式的icon文件，遗留大量重复icon，
 * 所以个人项目中决定使用symbol的方式对icon进行引入，以后icon在
 * iconfont上的添加只需要更新utils中的iconfont.min.js即可，
 * 无需本地的svg文件进行维护(反正没有了)
 */
interface IProps {
    className?: string
    onClick?: (e?: React.MouseEvent) => void
    id: string
    color?: string
    width?: number
    height?: number
}

const Icon: React.FC<IProps> = ({ className, onClick, id, color, width, height }) => {
    return (
        <span onClick={onClick} className={className}>
            <svg className="icon" style={{ fill: color, width, height }}>
                <use xlinkHref={`#icon-${id}`} />
            </svg>
        </span>
    )
}

export default Icon
