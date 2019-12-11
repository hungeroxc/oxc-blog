import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, Menu, Icon, Comment, Input, Button, message, Avatar } from 'antd'

import styles from './index.scss'
import { useUserStore } from '@store/index'
import AuthModal from '@shared/BlogLayout/AuthModal'
import { publishComment } from '@services/api'
import { ArticleItem, CommentItem, ReplyItem } from '@views/ArticleList/ArticleItem'
import DiscussList from './DiscussList'

interface IProps {
    articleData: ArticleItem
}

const MenuItem = Menu.Item

const { TextArea } = Input

const Discuess = ({ articleData }: IProps) => {
    const [isShowAuthModal, setIsShowAuthModal] = useState<boolean>(false)
    // 弹框类型
    const [authModalType, setAuthModalType] = useState<string>('login')
    // 评论内容
    const [commentContent, setCommentContent] = useState<string>('')
    // 当前组件控制的评论
    const [tempCommentList, setTempCommentList] = useState<CommentItem[]>([])

    const {
        state: { userInfo },
        dispatch
    } = useUserStore()

    // 退出登录
    const logout = () => {
        dispatch({ type: 'USER_LOGIN_OUT' })
    }

    const triggerAuthModal = (visible: boolean, type?: string) => {
        setIsShowAuthModal(visible)
        setAuthModalType(type)
    }

    const pushComment = async () => {
        if (!commentContent || commentContent.length > 500) {
            return message.error('评论字数不能超过500也不能为空')
        }
        if (!userInfo) {
            return message.error('请先登录')
        }
        const data = {
            userId: userInfo.id,
            articleId: articleData.id,
            content: commentContent
        }
        try {
            const res = await publishComment(data)
            if (!!res.data) {
                setTempCommentList([...tempCommentList, res.data])
                setCommentContent('')
                message.success('评论成功')
            }
        } catch (error) {}
    }

    // 回复给评论或者回复给用户的回复
    const setDiscussReply = (commentId: number, replyItem: ReplyItem) => {
        const list = [...tempCommentList]
        const targetComment = list.find(item => item.id === commentId)
        targetComment.replies.push(replyItem)
        setTempCommentList(list)
    }

    const setDeleteDiscussReply = (commentId: number, replyId?: number, isReply?: boolean) => {
        const list = [...tempCommentList]
        if (isReply) {
            const targetComment = tempCommentList.find(item => item.id === commentId)
            const targetReplyIndex = targetComment.replies.findIndex(item => item.id === replyId)
            targetComment.replies.splice(targetReplyIndex, 1)
        } else {
            const targetCommentIndex = tempCommentList.findIndex(item => item.id === commentId)
            list.splice(targetCommentIndex, 1)
        }
        setTempCommentList(list)
    }

    const renderMenu = () => {
        return !!userInfo ? (
            <Menu>
                <MenuItem onClick={logout}>注销</MenuItem>
            </Menu>
        ) : (
            <Menu>
                <MenuItem onClick={() => triggerAuthModal(true, 'login')}>登录</MenuItem>
                <MenuItem onClick={() => triggerAuthModal(true, 'register')}>注册</MenuItem>
            </Menu>
        )
    }

    const discussCount = useMemo(() => {
        let count = tempCommentList.length
        tempCommentList.forEach(item => {
            count = count + item.replies.length
        })
        return count
    }, [tempCommentList])

    useEffect(() => {
        setTempCommentList(articleData.comments)
    }, [articleData.comments])

    return (
        <div className={styles.discussContainer}>
            <div className={styles.header}>
                <div className={styles.countInfo}>
                    <span className={styles.count}>{discussCount}</span>条评论
                </div>
                <div className={styles.user}>
                    <Dropdown trigger={['click']} placement="bottomCenter" overlay={renderMenu()}>
                        <div>
                            {!!userInfo ? userInfo.username : '未登录用户'}
                            <Icon type="down" className={styles.userSelectIcon} />
                        </div>
                    </Dropdown>
                </div>
            </div>
            <div className={styles.commentWrapper}>
                <Comment
                    avatar={
                        !!userInfo ? (
                            <Avatar size="large" className={styles.headerAvatar}>
                                {userInfo.username}
                            </Avatar>
                        ) : (
                            <Icon className={styles.defaultAvatar} type="github" theme="filled" />
                        )
                    }
                    content={
                        <TextArea
                            value={commentContent}
                            onChange={e => setCommentContent(e.target.value)}
                            rows={4}
                            placeholder="说点什么..."
                        />
                    }
                />
                <div className={styles.addCommentBtn}>
                    <div />
                    <div className={styles.operationContainer}>
                        <div className={styles.note}>支持Markdown语法</div>
                        <Button onClick={pushComment} type="primary">
                            提交
                        </Button>
                    </div>
                </div>
            </div>
            <DiscussList
                setDeleteDiscussReply={setDeleteDiscussReply}
                setDiscussReply={setDiscussReply}
                userInfo={userInfo}
                commentList={tempCommentList}
            />
            <AuthModal
                triggerAuthModal={triggerAuthModal}
                authModalType={authModalType}
                visible={isShowAuthModal}
                closeModal={() => setIsShowAuthModal(false)}
            />
        </div>
    )
}

export default Discuess
