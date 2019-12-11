import React, { useState } from 'react'

import styles from './index.scss'
import { CommentItem, ReplyItem } from '@views/ArticleList/ArticleItem'
import DiscussItem from './DiscussItem'

interface IProps {
    commentList: CommentItem[]
    userInfo: IUserStore.UserInfo
    setDiscussReply: (commentId: number, replyItem: ReplyItem) => void
    setDeleteDiscussReply: (commentId: number, replyId?: number, isReply?: boolean) => void
}

const DiscussList = ({ commentList, userInfo, setDiscussReply, setDeleteDiscussReply }: IProps) => {
    // 回复目标用户的id
    const [replyTargetUserId, setReplyTargetUserId] = useState<number>(null)
    // 回复目标评论id
    const [replyTargetCommentId, setReplyTargetCommentId] = useState<number>(null)
    // reply目标用户的id
    const [replyTargetReplyUserId, setReplyTargetReplyUserId] = useState<number>(null)
    // 回复目标回复id
    const [replyTargetReplyId, setReplyTargetReplyId] = useState<number>(null)

    // 回复评论
    const onReplyComment = (userId: number, commentId: number) => {
        setReplyTargetUserId(userId)
        setReplyTargetCommentId(commentId)
    }

    // 回复回复
    const onReplyReply = (userId: number, commentId: number) => {
        setReplyTargetReplyUserId(userId)
        setReplyTargetReplyId(commentId)
    }

    return (
        <div className={styles.commentListContainer}>
            {commentList.map(item => (
                <DiscussItem
                    replyTargetUserId={replyTargetUserId}
                    replyTargetCommentId={replyTargetCommentId}
                    onReplyComment={onReplyComment}
                    data={item}
                    key={item.id}
                    userInfo={userInfo}
                    setDiscussReply={setDiscussReply}
                    commentId={item.id}
                    setDeleteDiscussReply={setDeleteDiscussReply}
                >
                    {item.replies.map(reply => (
                        <DiscussItem
                            replyTargetUserId={replyTargetReplyUserId}
                            replyTargetCommentId={replyTargetReplyId}
                            onReplyComment={onReplyReply}
                            data={reply}
                            key={reply.id}
                            userInfo={userInfo}
                            isReply
                            setDiscussReply={setDiscussReply}
                            commentId={item.id}
                            setDeleteDiscussReply={setDeleteDiscussReply}
                        />
                    ))}
                </DiscussItem>
            ))}
        </div>
    )
}

export default DiscussList
