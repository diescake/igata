import React, { FC, useState, ChangeEvent } from 'react'
import clsx from 'clsx'
import style from '@/app/components/AnswerPost/style.scss'
import words from '@/assets/strings'
import { AnswerDispatcher } from '@/app/actions/answer'

export interface Props {
  readonly userId: string
  readonly questionId: string
  readonly postAnswer: AnswerDispatcher['postAnswer']
}

export const AnswerPost: FC<Props> = (props: Props) => {
  const [body, setBody] = useState<string>('')
  const [isBodyErrorEmpty, setIsBodyErrorEmpty] = useState<boolean>(false)

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
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
      <div>
        <div className={style.title}>{words.question.answer}</div>
        <hr className={style.hr} />
        {!props.userId && (
          <>
            <div>{words.question.loginToAnswer}</div>
          </>
        )}

        {props.userId && (
          <>
            {isBodyErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
            <form>
              <textarea
                maxLength={3000}
                minLength={1}
                required
                className={clsx(style.edit, style.formControl)}
                onChange={handleTextChange}
                value={body}
              />
              <div className={style.formGroup}>
                <button type="button" className={clsx(style.button)} onClick={handlePostClick}>
                  {words.question.post}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
