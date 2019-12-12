// 请求参数
export as namespace FetchParams

export interface GetList {
    page?: number
    pageSize?: number
    keyword?: string
    sortName?: string
    sortType?: 'DESC' | 'ASC'
    justTitle?: boolean
}

// 请求文章列表
interface GetArticleList extends GetList {
    tag?: string
}

// 请求用户列表
interface GetUserList extends GetList {}
