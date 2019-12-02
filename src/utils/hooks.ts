import { useState, useEffect } from 'react'

// T数据类型, P参数
export const useGetListData = <T, P = {}>(api: (params?: P) => Promise<any>, params?: P, isCancel?: boolean) => {
    const [list, setList] = useState<T[]>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)

    const getList = async () => {
        setLoading(true)
        try {
            const res = await api(params)
            if (res.data.list instanceof Array) {
                setList(res.data.list)
                setTotal(res.data.total)
                setPage(res.data.current)
            }
            setLoading(false)
        } catch (error) {}
    }

    useEffect(() => {
        if (!isCancel) {
            getList()
        }
    }, [params])

    return {
        list,
        loading,
        total,
        page
    }
}
