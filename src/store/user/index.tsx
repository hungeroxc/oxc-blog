import React, { createContext, ComponentType, useReducer, useContext } from 'react'

import { State } from './types'
import reducer from './reducer'

export const initState: State = {
    userInfo: null
}

const StateCtx = createContext(initState)

// 因为Context的Provider通过一个value传值，因此useReducer返回出来的dispatch需要多一个Context传入进去
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
