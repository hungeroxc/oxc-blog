export interface TagItem {
    id: number
    value: string
    color?: string
}

export type Action = { type: 'SET_TAG_LIST'; payload: { list: TagItem[]; isGetTagList: boolean } }

export interface State {
    tagList: TagItem[]
    isGetTagList: boolean
}
