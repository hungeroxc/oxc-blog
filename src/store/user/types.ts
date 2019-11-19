interface UserInfo {
    username: string
    auth: 1 | 2
    id: number
    token?: string
}

export type Action = { type: 'USER_LOGIN'; payload: UserInfo } | { type: 'USER_LOGIN_OUT' }

export interface State {
    userInfo: UserInfo
}
