import React, { FC, useState } from 'react'
import style from '@/app/components/QuestionPager/style.scss'
import { Question } from '@/app/models/Question'
import { QuestionDispatcher } from '@/app/actions/question'

export interface Props {
  readonly questions: Question[]
  readonly fetchQuestions: QuestionDispatcher['fetchQuestions']
}

export const QuestionPager: FC<Props> = (props: Props) => {
  const listValue = props.questions.length
  const [backPage, setBackPage] = useState<string[]>([])
  const page = backPage.length
  return (
    <div className={style.center}>
      {backPage.length > 0 && (
        <button
          type="button"
          className={style.inline}
          onClick={() => {
            const backFormId = backPage[backPage.length - 1]
            const copiedBackPage = [...backPage].slice(0, -1)
            setBackPage(copiedBackPage)
            console.log(backFormId)
            props.fetchQuestions('', backFormId)
          }}
        >
          {'<'}
        </button>
      )}
      <div className={style.inline}>{`${page}`}</div>
      {/* TODO： 10に変更する */}
      {listValue >= 1 && (
        <button
          type="button"
          className={style.inline}
          onClick={() => {
            const nextFormId = props.questions[props.questions.length - 1].id
            const copiedBackPage = [...backPage]
            setBackPage(copiedBackPage.concat([nextFormId]))
            props.fetchQuestions('', nextFormId)
          }}
        >
          {'>'}
        </button>
      )}
    </div>
  )
}
