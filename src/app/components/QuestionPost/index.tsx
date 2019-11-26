import React, { FC, ChangeEvent, useState } from 'react'
import clsx from 'clsx'
import style from '@/app/components/QuestionPost/style.scss'
import words from '@/assets/strings'
import { QuestionDispatcher } from '@/app/actions/question'

export interface Props {
  readonly userId: string
  readonly postQuestion: QuestionDispatcher['postQuestion']
}

export const QuestionPost: FC<Props> = (props: Props) => {
  const [title, setTitle] = useState<string>()
  const [body, setBody] = useState<string>()
  const [isTitleErrorEmpty, setIsTitleErrorEmpty] = useState<boolean>(false)
  const [isBodyErrorEmpty, setIsBodyErrorEmpty] = useState<boolean>(false)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const handlePostQuestion = () => {
    if (title && body) {
      props.postQuestion(title, body)
      return
    }
    setIsTitleErrorEmpty(!title)
    setIsBodyErrorEmpty(!body)
  }
  return (
    <div>
      <div className={style.main}>
        <div className={style.pageTitle}>{words.questionCreate.postQuestion}</div>

        {!props.userId && <div>{words.questionCreate.notLoginBody}</div>}

        {props.userId && (
          <>
            <div className={style.label}>{words.questionCreate.title}</div>
            <br />
            {isTitleErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
            <form>
              <input
                maxLength={100}
                minLength={1}
                required
                className={clsx(style.titleEdit, style.formControl)}
                type="text"
                onChange={handleTitleChange}
                value={title}
              />
              <br />
              <div className={style.label}>{words.questionCreate.body}</div>
              <br />
              {isBodyErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
              <textarea
                maxLength={3000}
                minLength={1}
                required
                className={clsx(style.bodyEdit, style.formControl)}
                onChange={handleTextChange}
                value={body}
              />
              <br />
              <div className={style.formGroup}>
                <button type="button" className={style.button} onClick={handlePostQuestion}>
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
