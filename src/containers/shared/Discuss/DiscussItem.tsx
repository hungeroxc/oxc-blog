import React, { useState, useEffect, useMemo } from 'react'
import { Comment, Avatar, Tooltip, Input, Button, message, Icon, Popconfirm } from 'antd'
import moment from 'moment'
import classnames from 'classnames'

import { CommentItem, ReplyItem } from '@views/ArticleList/ArticleItem'
import styles from './index.scss'
import { replyComment, deleteComment, deleteReply } from '@services/api'
import { markdownToHtml } from '@utils/index'

const { TextArea } = Input

interface IProps {
    data: CommentItem
    replyTargetUserId: number
    replyTargetCommentId: number
    onReplyComment: (userId: number, commentId: number) => void
    userInfo: IUserStore.UserInfo
    isReply?: boolean
    setDiscussReply: (commentId: number, replyItem: ReplyItem) => void
    commentId: number
}

const DiscussItem: React.FC<IProps> = ({
    children,
    data,
    replyTargetUserId,
    replyTargetCommentId,
    onReplyComment,
    userInfo,
    isReply,
    setDiscussReply,
    commentId
}) => {
    const { user, createdAt, content, replyUser, targetUsername } = data

    const currentUser = isReply ? replyUser : user

    // 输入的值
    const [value, setValue] = useState<string>('')

    const renderUserInfo = () => {
        return (
            <div className={styles.commentUserInfo}>
                <Avatar className={styles.commentAvatar}>{currentUser.username}</Avatar>
            </div>
        )
    }

    // 点击回复按钮
    const clickReply = () => {
        onReplyComment(currentUser.id, data.id)
    }

    // 回复该用户的评论
    const replyTheComment = async () => {
        if (!value || value.length > 500) {
            return message.error('回复的字数不能超过500也不能为空')
        }
        if (!userInfo) {
            return message.error('请先登录')
        }
        const params = {
            content: value,
            userId: userInfo.id,
            commentId,
            targetUserInfo: currentUser
        }
        try {
            const res = await replyComment(params)
            if (!!res.data) {
                setDiscussReply(commentId, res.data)
                onReplyComment(null, null)
                message.success('回复成功')
            }
        } catch (error) {}
    }

    // 删除评论
    const deleteDiscuss = async () => {
        const api = isReply ? deleteReply : deleteComment
        try {
            await api({ id: data.id })
            message.success('删除成功')
        } catch (error) {}
    }

    const isShowReply = useMemo(() => {
        return replyTargetUserId === currentUser.id && replyTargetCommentId === data.id
    }, [replyTargetUserId, replyTargetCommentId])

    useEffect(() => {
        if (replyTargetUserId !== currentUser.id || replyTargetCommentId !== data.id) {
            setValue('')
        }
    }, [replyTargetUserId, replyTargetCommentId])

    return (
        <Comment
            avatar={renderUserInfo()}
            actions={[
                <span onClick={clickReply} key="reply">
                    回复
                </span>,
                <>
                    {!!userInfo && userInfo.auth === 2 && (
                        <Popconfirm
                            onConfirm={deleteDiscuss}
                            cancelText="取消"
                            okText="确认"
                            title={`是否删除该${isReply ? '回复' : '评论'}`}
                        >
                            <Icon style={{ cursor: 'pointer', color: 'red' }} type="delete" />
                        </Popconfirm>
                    )}
                </>
            ]}
            author={<span>{isReply ? `${currentUser.username} 回复给 ${targetUsername}` : currentUser.username}</span>}
            content={
                <div
                    className={classnames(styles.commentContent, styles.markdown)}
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(content, true) }}
                />
            }
            datetime={
                <Tooltip title={createdAt}>
                    <span>{moment(createdAt).fromNow()}</span>
                </Tooltip>
            }
        >
            {isShowReply && (
                <div className={styles.replyTextArea}>
                    <TextArea
                        rows={3}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        placeholder={`回复给用户: ${currentUser.username}`}
                    />
                    <div className={styles.replyBtn}>
                        <Button onClick={replyTheComment} type="primary">
                            回复
                        </Button>
                    </div>
                </div>
            )}
            {children}
        </Comment>
    )
}

export default DiscussItem
