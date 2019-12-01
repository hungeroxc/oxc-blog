export as namespace ITagStore 

export interface State {
    tagList: TagItem[]
    isGetTagList: boolean
}

interface TagItem {
    id: number
    value: string
    color?: string
    count?: number
}

type Action = { type: 'SET_TAG_LIST'; payload: { list: TagItem[]; isGetTagList: boolean } }


