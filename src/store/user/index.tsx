import React, { createContext, ComponentType, useReducer, useContext, Dispatch } from 'react'

import reducer from './reducer'

export const initState: IUserStore.State = {
    userInfo: null
}

const UserCtx = createContext<Context<IUserStore.State, Dispatch<IUserStore.Action>>>(null)

export const Provider: ComponentType = props => {
    const [state, dispatch] = useReducer(reducer, initState)

    return <UserCtx.Provider value={{ state, dispatch }}>{props.children}</UserCtx.Provider>
}

export const useUserStore = () => useContext(UserCtx)
