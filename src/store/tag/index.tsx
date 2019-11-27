import React, { createContext, ComponentType, useReducer, useContext } from 'react'

import { State } from './types'
import reducer from './reducer'

export const initState: State = {
    tagList: [],
    isGetTagList: false
}

const StateCtx = createContext(initState)

const DispatchCtx = createContext(null)

export const Provider: ComponentType = props => {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <DispatchCtx.Provider value={dispatch}>
            <StateCtx.Provider value={state}>{props.children}</StateCtx.Provider>
        </DispatchCtx.Provider>
    )
}

export const useDispatch = () => useContext(DispatchCtx)

export const useStateValue = () => useContext(StateCtx)
