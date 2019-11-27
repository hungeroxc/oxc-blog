import React, { useEffect, useState } from 'react'
import { Input, Button, Table, Popconfirm } from 'antd'
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer'
import { PaginationConfig, SorterResult } from 'antd/lib/table'

import styles from './index.scss'
import { getUserList, deleteUserById } from '@services/api'

const { Column } = Table

const pageSize = 10

type sortTypeType = 'ASC' | 'DESC' | null

interface UserItem {
    username: string
    createdAt: string
    id: number
}

const UserManager = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [list, setList] = useState<UserItem[]>([])
    // 页码相关
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    // 筛选相关
    const [keyword, setKeyword] = useState<string>('')
    const [currentKeyword, setCurrentKeyword] = useState<string>('')
    // 排序
    const [sortName, setSortName] = useState<string>(null)
    const [sortType, setSortType] = useState<sortTypeType>(null)

    const getList = async () => {
        const data = {
            page,
            pageSize,
            sortName,
            sortType,
            keyword: currentKeyword
        }
        try {
            const res = await getUserList(data)
            if (res.data.list instanceof Array) {
                if (res.data.list.length === 0 && res.data.total > 0) {
                    setPage(page - 1)
                    return
                }
                setList(res.data.list)
                setTotal(res.data.total)
                setLoading(false)
            }
        } catch (error) {}
    }

    const onSearch = () => {
        setPage(1)
        setCurrentKeyword(keyword)
    }

    const deleteUser = async (id: number) => {
        try {
            await deleteUserById({ id })
            getList()
        } catch (error) {}
    }

    // 渲染操作
    const renderOperation = (record: UserItem) => {
        return (
            <div className={styles.operation}>
                <Popconfirm
                    title="确定删除该用户吗?"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => deleteUser(record.id)}
                >
                    <span className={styles.operationItem}>删除</span>
                </Popconfirm>
            </div>
        )
    }

    // 换页和排序
    const changePageAndSorter = (pageStatus: PaginationConfig, sorterStatus: SorterResult<UserItem>) => {
        const { current } = pageStatus
        if (current !== page) {
            setPage(current)
        }
        const { columnKey, order } = sorterStatus
        if (!!Object.keys(sorterStatus).length) {
            setSortName(columnKey)
            setSortType(order === 'ascend' ? 'ASC' : 'DESC')
        } else {
            setSortName(null)
            setSortType(null)
        }
    }

    useEffect(() => {
        getList()
    }, [page, sortName, sortType, currentKeyword])

    const pagination = {
        total,
        current: page,
        pageSize
    }

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <div className={styles.searchItem}>
                    <div className={styles.label}>用户名:</div>
                    <Input
                        onPressEnter={onSearch}
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        placeholder="请输入用户名"
                    />
                </div>
                <Button onClick={onSearch} type="primary">
                    搜索
                </Button>
            </div>
            <AutoSizer disableWidth className={styles.dataList}>
                {({ height }) => {
                    return (
                        <Table
                            pagination={pagination}
                            loading={loading}
                            rowKey="id"
                            scroll={{ y: height - 220, x: 700 }}
                            dataSource={list}
                            onChange={(p, f, s) => changePageAndSorter(p, s)}
                        >
                            <Column<UserItem> width={200} key="username" dataIndex="username" title="用户名" />
                            <Column<UserItem>
                                sorter
                                width={200}
                                key="createdAt"
                                dataIndex="createdAt"
                                title="注册时间"
                            />
                            <Column<UserItem>
                                key="operation"
                                title="操作"
                                width={100}
                                render={record => renderOperation(record)}
                            />
                        </Table>
                    )
                }}
            </AutoSizer>
        </div>
    )
}

export default UserManager
