const colorList = ['magenta', 'blue', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue', 'purple']

const reducer = (state: ITagStore.State, action: ITagStore.Action) => {
    switch (action.type) {
        case 'SET_TAG_LIST':
            const list = [...action.payload.list]
            list.forEach((tag, i) => {
                tag.color = !!colorList[i] ? colorList[i] : colorList[Math.floor(Math.random() * 11)]
            })
            return { isGetTagList: action.payload.isGetTagList, tagList: list }
        default:
            return state
    }
}

export default reducer
