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
  const [body, setBody] = useState<string>('')
  const [isBodyErrorEmpty, setIsBodyErrorEmpty] = useState<boolean>(false)

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)
  const handlePostClick = () => {
    if (props.postAnswer && body && props.questionId) {
      // 回答
      props.postAnswer(body, props.questionId)
      setBody('')
    }
    setIsBodyErrorEmpty(!body)
  }

  return (
    <div>
      <div className={style.newAnswer}>
        <div>{words.question.answer}</div>
        <hr />
        {!props.userId && (
          <>
            <div>{words.question.loginToAnswer}</div>
          </>
        )}

        {props.userId && (
          <>
            {isBodyErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
            <form>
              <input
                id="new-comment"
                maxLength={3000}
                minLength={1}
                required
                className={`${style.titleEdit} ${style.formControl}`}
                type="text"
                onChange={handleTextChange}
                value={body}
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
    </div>
  )
}
