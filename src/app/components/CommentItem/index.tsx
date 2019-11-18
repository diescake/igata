import React, { FC, useState, ChangeEvent } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import style from '@/app/components/CommentItem/style.scss'
import { Comment } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'
import { CommentDispatcher } from '@/app/actions/comment'

type Props = {
  readonly comment: Comment
  readonly id: string
  readonly userId: string
  readonly questionId?: string
  readonly answerId?: string
  readonly putCommentQuestion?: CommentDispatcher['putCommentQuestion']
  readonly putCommentAnswer?: CommentDispatcher['putCommentAnswer']
} & RouteComponentProps

export const CommentItemBase: FC<Props> = (props: Props) => {
  const [text, setText] = useState<string>('')
  const [isUpdateComment, setIsUpdateComment] = useState<boolean>(false)

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handlePutClick = () => {
    if (typeof props.putCommentQuestion !== 'undefined' && props.questionId) {
      // 質問のコメントを更新
      props.putCommentQuestion(`${paths.question}${props.questionId}${paths.answer}/${props.comment.id}`, text, props.id)
    } else if (typeof props.putCommentAnswer !== 'undefined' && props.answerId) {
      // 回答のコメントを更新
      props.putCommentAnswer(`${paths.answer}${props.answerId}${paths.answer}/${props.comment.id}`, text, props.id)
    }
    setIsUpdateComment(false)
    setText('')
  }

  return (
    <div>
      {/* コメントの表示 */}
      {!isUpdateComment && (
        <>
          <div>
            <div className={style.body}>{props.comment.body}</div>
            <div className={style.additional}>
              {words.common.additional(props.comment.createdAt)}
              {words.common.by}
              <Link to={paths.user + props.comment.userId}>{props.comment.userId}</Link>
              <span>
                {/* 同じidなら編集可能にする */}
                <button
                  type="button"
                  onClick={e => {
                    setText(props.comment.body)
                    setIsUpdateComment(true)
                    e.preventDefault()
                  }}
                >
                  更新
                </button>
              </span>
            </div>
          </div>
        </>
      )}

      {/* コメントを更新 */}
      {isUpdateComment && (
        <>
          <form>
            <input
              id="updateComment"
              maxLength={3000}
              minLength={1}
              required
              className={`${style.titleEdit} ${style.formControl}`}
              type="text"
              onChange={handleTextChange}
              value={text}
            />
            <div className={style.formGroup}>
              <button type="button" className={style.btnPrimary} onClick={handlePutClick}>
                保存
              </button>
            </div>
          </form>
          <button
            type="button"
            className={style.btnPrimary}
            onClick={e => {
              setIsUpdateComment(false)
              e.preventDefault()
            }}
          >
            キャンセル
          </button>
        </>
      )}
      <hr />
    </div>
  )
}
export const CommentItem = withRouter(CommentItemBase)
