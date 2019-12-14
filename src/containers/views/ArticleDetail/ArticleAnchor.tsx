import React from 'react'
import { Anchor } from 'antd'

interface AnchorItem {
    tag: string
    title: string
    href: string
    children: AnchorItem[]
}

interface IProps {
    content: string
    className?: string
}

const { Link } = Anchor

const getAnchorList = (value: string) => {
    const reg = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g
    const reg2 = /<.+?>/g
    const list = []
    const pushItem = (arr: AnchorItem[], item: AnchorItem) => {
        const len = arr.length
        const matchItem = arr[len - 1]
        if (matchItem && matchItem.tag !== item.tag) {
            pushItem(matchItem.children, item)
        } else {
            arr.push(item)
        }
    }
    value.replace(reg, ($0: string, $1: string): any => {
        const title = $0.replace(/.*?>/, '').replace(reg2, '')
        const startIndex = $0.indexOf('"')
        const endIndex = $0.indexOf('">')

        const href = `#${$0.slice(startIndex + 1, endIndex)}`
        const currentItem: AnchorItem = {
            tag: $1,
            title,
            href,
            children: []
        }
        pushItem(list, currentItem)
    })
    return list
}

const ArticleAnchor = ({ content, className }: IProps) => {
    const list: AnchorItem[] = getAnchorList(content)

    const renderLink = (item: AnchorItem) => {
        return (
            <Link key={item.href} href={item.href} title={item.title}>
                {item.children.length > 0 && item.children.map(sub => renderLink(sub))}
            </Link>
        )
    }

    return (
        <Anchor className={className} affix={false}>
            {list.map(renderLink)}
        </Anchor>
    )
}

export default ArticleAnchor
