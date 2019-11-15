import React, { FC, useState, ChangeEvent } from 'react'
import style from '@/app/components/CommentForm/style.scss'
import words from '@/assets/strings'
import { CommentDispatcher } from '@/app/actions/comment'
import { paths } from '@/app/common/paths'

export interface Props {
  readonly id: string
  readonly userId: string
  readonly questionId?: string
  readonly answerId?: string
  readonly postCommentQuestion?: CommentDispatcher['postCommentQuestion']
  readonly postCommentAnswer?: CommentDispatcher['postCommentAnswer']
}
export const CommentForm: FC<Props> = (props: Props) => {
  const [text, setText] = useState<string>('')
  const handletTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handlePostClick = () => {
    if (typeof props.postCommentQuestion !== 'undefined' && props.questionId) {
      // 質問にコメント
      props.postCommentQuestion(`${paths.question}${props.questionId}/comment`, text, props.id)
    } else if (typeof props.postCommentAnswer !== 'undefined' && props.answerId) {
      // 回答にコメント
      props.postCommentAnswer(`${paths.question}${props.answerId}/comment`, text, props.id)
    }
    setText('')
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
          <div>コメント追加</div>
          <form>
            <input
              id="new-comment"
              maxLength={3000}
              minLength={1}
              required
              className={`${style.titleEdit} ${style.formControl}`}
              type="text"
              onChange={handletTextChange}
              value={text}
            />
            <div className={style.formGroup}>
              <button type="button" className={style.btnPrimary} onClick={handlePostClick}>
                {words.todoApp.addTodo}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
