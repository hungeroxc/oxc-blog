export as namespace IUserStore

export interface State {
    userInfo: UserInfo
}

interface UserInfo {
    username: string
    auth: 1 | 2
    id: number
    token?: string
}

type Action = { type: 'USER_LOGIN'; payload: UserInfo } | { type: 'USER_LOGIN_OUT' }


