import React, { useEffect, useState } from 'react'
import { Table, Input, Button, Popconfirm, Tag } from 'antd'
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer'
import { PaginationConfig, SorterResult } from 'antd/lib/table'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import { ArticleItem } from '@views/ArticleList/ArticleItem'
import { getArticleList, deleteArticleById } from '@services/api'
import UpdateArticle from './UpdateArticle'
import { getTagColor } from '@utils/index'
import { useStateValue as useTagsState } from '@store/tag'

const { Column } = Table

const pageSize = 10

type sortTypeType = 'ASC' | 'DESC' | null

const ArticleManager = ({ history }: RouteComponentProps) => {
    const [list, setList] = useState<ArticleItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    // 页码相关
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    // 筛选相关
    const [keyword, setKeyword] = useState<string>('')
    const [currentKeyword, setCurrentKeyword] = useState<string>('')
    // 排序
    const [sortName, setSortName] = useState<string>(null)
    const [sortType, setSortType] = useState<sortTypeType>(null)
    // 编辑文章
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false)
    const [editTarget, setEditTarget] = useState<ArticleItem>(null)

    const { tagList } = useTagsState()

    const getList = async () => {
        setLoading(true)
        const data = {
            page,
            pageSize,
            keyword: currentKeyword,
            sortName,
            sortType
        }
        try {
            const res = await getArticleList(data)
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

    // 换页和排序
    const changePageAndSorter = (pageStatus: PaginationConfig, sorterStatus: SorterResult<ArticleItem>) => {
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

    // 编辑文章
    const triggerShowEditArticle = (isShow: boolean, targetArticle?: ArticleItem) => {
        setIsShowEdit(isShow)
        setEditTarget(isShow ? targetArticle : null)
    }

    // 跳转并查看文章
    const checkArticle = (id: number) => {
        history.push(`/article-detail/${id}`)
    }

    // 删除文章
    const deleteArticle = async (id: number) => {
        try {
            await deleteArticleById({ id })
            getList()
        } catch (error) {}
    }

    // 触发搜索
    const onSearch = () => {
        setPage(1)
        setCurrentKeyword(keyword)
    }

    // 去tag文章页面
    const gotoTagWithArticle = (value: string) => {
        history.push(`/tag/${value}`)
    }

    // 渲染标签相关
    const renderTags = (article: ArticleItem) => {
        const tempTagList = getTagColor(tagList, article.tags)
        return (
            <>
                {tempTagList.map(item => {
                    return (
                        <Tag
                            className={styles.tag}
                            onClick={() => gotoTagWithArticle(item.value)}
                            color={item.color}
                            key={item.id}
                        >
                            {item.value}
                        </Tag>
                    )
                })}
            </>
        )
    }

    // 渲染表格中的操作
    const renderOperation = (record: ArticleItem) => {
        return (
            <div className={styles.operation}>
                <span onClick={() => checkArticle(record.id)} className={styles.operationItem}>
                    查看
                </span>
                <span onClick={() => triggerShowEditArticle(true, record)} className={styles.operationItem}>
                    编辑
                </span>
                <Popconfirm
                    title="确定删除该文章吗?"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => deleteArticle(record.id)}
                >
                    <span className={styles.operationItem}>删除</span>
                </Popconfirm>
            </div>
        )
    }

    useEffect(() => {
        getList()
    }, [page, currentKeyword, sortName, sortType])

    const pagination = {
        total,
        current: page,
        pageSize
    }

    return (
        <div className={styles.articleManager}>
            {isShowEdit ? (
                <UpdateArticle
                    getArticleList={getList}
                    triggerShowEditArticle={triggerShowEditArticle}
                    editTarget={editTarget}
                />
            ) : (
                <>
                    <div className={styles.filter}>
                        <div className={styles.searchItem}>
                            <div className={styles.label}>标题:</div>
                            <Input
                                onPressEnter={onSearch}
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                placeholder="请输入标题"
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
                                    onChange={(p, f, s) => changePageAndSorter(p, s)}
                                    rowKey="id"
                                    pagination={pagination}
                                    dataSource={list}
                                    loading={loading}
                                    scroll={{ y: height - 220, x: 1200 }}
                                    bordered
                                >
                                    <Column<ArticleItem> width={200} key="title" dataIndex="title" title="标题" />
                                    <Column<ArticleItem>
                                        width={500}
                                        key="tags"
                                        title="标签"
                                        render={(article: ArticleItem) => renderTags(article)}
                                    />
                                    <Column<ArticleItem>
                                        sorter
                                        width={200}
                                        key="createdAt"
                                        dataIndex="createdAt"
                                        title="创建时间"
                                    />
                                    <Column<ArticleItem>
                                        sorter
                                        width={200}
                                        key="updatedAt"
                                        dataIndex="updatedAt"
                                        title="修改时间"
                                    />
                                    <Column<ArticleItem>
                                        key="operation"
                                        title="操作"
                                        width={100}
                                        render={(record: ArticleItem) => renderOperation(record)}
                                    />
                                </Table>
                            )
                        }}
                    </AutoSizer>
                </>
            )}
        </div>
    )
}

export default withRouter(ArticleManager)
