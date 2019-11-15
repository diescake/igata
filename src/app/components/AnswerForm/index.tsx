import React, { FC, useState, ChangeEvent } from 'react'
import style from '@/app/components/CommentForm/style.scss'
import words from '@/assets/strings'
import { AnswerDispatcher } from '@/app/actions/answer'

export interface Props {
  readonly userId: string
  readonly questionId: string
  readonly postAnswer: AnswerDispatcher['postAnswer']
}

export const AnswerForm: FC<Props> = (props: Props) => {
  const [text, setText] = useState<string>('')
  const handletTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handlePostClick = () => {
    if (typeof props.postAnswer !== 'undefined' && props.questionId) {
      // 回答
      props.postAnswer(text, props.questionId)
      setText('')
    }
  }
  return (
    <div>
      {!props.userId && (
        <>
          <div>{words.question.loginToAnswer}</div>
        </>
      )}

      {props.userId && (
        <>
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
