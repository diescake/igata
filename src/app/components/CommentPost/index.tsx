import React, { FC, useState, ChangeEvent } from 'react'
import clsx from 'clsx'
import style from '@/app/components/CommentPost/style.scss'
import words from '@/assets/strings'
import { CommentDispatcher } from '@/app/actions/comment'

export interface Props {
  readonly userId: string
  readonly questionId: string
  readonly answerId?: string
  readonly postCommentQuestion?: CommentDispatcher['postCommentQuestion']
  readonly postCommentAnswer?: CommentDispatcher['postCommentAnswer']
}
export const CommentPost: FC<Props> = (props: Props) => {
  const [body, setBody] = useState<string>('')
  const [isBodyErrorEmpty, setIsBodyErrorEmpty] = useState<boolean>(false)
  const handleBodyChange = (e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)
  const handlePostClick = () => {
    if (props.postCommentQuestion && body) {
      // 質問にコメント
      props.postCommentQuestion(body, props.questionId)
      setBody('')
    } else if (props.postCommentAnswer && body && props.answerId) {
      // 回答にコメント
      props.postCommentAnswer(body, props.answerId, props.questionId)
      setBody('')
    }
    setIsBodyErrorEmpty(!body)
  }

  return (
    <div>
      {!props.userId && (
        <>
          <div className={style.commentList}>{words.question.loginToComment}</div>
        </>
      )}

      {props.userId && (
        <>
          <div className={style.title}>{words.question.commentAdd}</div>
          {isBodyErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
          <form>
            <input
              maxLength={3000}
              minLength={1}
              required
              className={clsx(style.edit, style.formControl)}
              type="text"
              onChange={handleBodyChange}
              value={body}
            />
            <div className={style.formGroup}>
              <button type="button" className={style.button} onClick={handlePostClick}>
                {words.question.post}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
