import React, { createContext, ComponentType, useReducer, useContext, Dispatch } from 'react'

import reducer from './reducer'

export const initState: ITagStore.State = {
    tagList: [],
    isGetTagList: false
}

const TagCtx = createContext<Context<ITagStore.State, Dispatch<ITagStore.Action>>>(null)

export const Provider: ComponentType = props => {
    const [state, dispatch] = useReducer(reducer, initState)

    return <TagCtx.Provider value={{ state, dispatch }}>{props.children}</TagCtx.Provider>
}

export const useTagStore = () => useContext(TagCtx)
