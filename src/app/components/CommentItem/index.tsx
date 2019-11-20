import React, { FC, useState, ChangeEvent } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import style from '@/app/components/CommentItem/style.scss'
import { Comment } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'
import { CommentDispatcher } from '@/app/actions/comment'

type Props = {
  readonly comment: Comment
  readonly userId: string
  readonly questionId: string
  readonly answerId?: string
  readonly putCommentQuestion?: CommentDispatcher['putCommentQuestion']
  readonly putCommentAnswer?: CommentDispatcher['putCommentAnswer']
} & RouteComponentProps

export const CommentItemBase: FC<Props> = (props: Props) => {
  const [body, setBody] = useState<string>('')
  const [isUpdateComment, setIsUpdateComment] = useState<boolean>(false)
  const [isBodyErrorEmpty, setIsBodyErrorEmpty] = useState<boolean>(false)
  const handleBodyChange = (e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)
  const handlePutClick = () => {
    if (props.putCommentQuestion && body && props.comment.id) {
      // 質問のコメントを更新
      props.putCommentQuestion(body, props.questionId, props.comment.id)
      setIsUpdateComment(false)
      setBody('')
    } else if (props.putCommentAnswer && body && props.answerId && props.comment.id) {
      // 回答のコメントを更新
      props.putCommentAnswer(body, props.answerId, props.comment.id, props.questionId)
      setIsUpdateComment(false)
      setBody('')
    }
    setIsBodyErrorEmpty(!body)
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
              <Link to={`${paths.user}${props.comment.userId}`}>{props.comment.userId}</Link>
              {props.userId === props.comment.userId && (
                <>
                  <span>
                    <button
                      type="button"
                      onClick={e => {
                        setBody(props.comment.body)
                        setIsUpdateComment(true)
                        e.preventDefault()
                      }}
                    >
                      {words.common.update}
                    </button>
                  </span>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* コメントを更新 */}
      {isUpdateComment && (
        <>
          {isBodyErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
          <form>
            <input
              maxLength={3000}
              minLength={1}
              required
              className={`${style.titleEdit} ${style.formControl}`}
              type="text"
              onChange={handleBodyChange}
              value={body}
            />
            <div className={style.formGroup}>
              <button type="button" className={style.btnPrimary} onClick={handlePutClick}>
                {words.common.save}
              </button>
            </div>
          </form>
          <button
            type="button"
            className={style.btnPrimary}
            onClick={e => {
              setIsUpdateComment(false)
              setIsBodyErrorEmpty(false)
              e.preventDefault()
            }}
          >
            {words.common.cancel}
          </button>
        </>
      )}
      <hr />
    </div>
  )
}
export const CommentItem = withRouter(CommentItemBase)
