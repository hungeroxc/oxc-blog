const reducer = (state: IUserStore.State, action: IUserStore.Action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, userInfo: action.payload }
        case 'USER_LOGIN_OUT':
            localStorage.removeItem('token')
            return { ...state, userInfo: null }
        default:
            return state
    }
}

export default reducer
