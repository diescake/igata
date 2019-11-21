import React, { FC, useState } from 'react'
import style from '@/app/components/QuestionPager/style.scss'
import { Question } from '@/app/models/Question'
import { QuestionDispatcher } from '@/app/actions/question'

export interface Props {
  readonly questions: Question[]
  readonly fetchQuestions: QuestionDispatcher['fetchQuestions']
}

export const QuestionPager: FC<Props> = (props: Props) => {
  const [fromIds, setFromIds] = useState<string[]>([])

  return (
    <div className={style.center}>
      {fromIds.length > 0 && (
        <button
          type="button"
          className={style.inline}
          onClick={() => {
            const copiedBackPage = [...fromIds]
            const backFromId = copiedBackPage.pop()
            setFromIds(copiedBackPage)
            props.fetchQuestions({
              fromId: backFromId,
            })
          }}
        >
          {'<'}
        </button>
      )}
      <div className={style.inline}>{fromIds.length + 1}</div>

      {/* 11件以上ある場合だけ次のページに遷移できる */}
      {props.questions.length >= 11 && (
        <button
          type="button"
          className={style.inline}
          onClick={() => {
            // 10件目の値を使用する
            const nextFromId = props.questions[props.questions.length - 2].id
            const copiedBackPage = [...fromIds]
            copiedBackPage.push(nextFromId)
            setFromIds(copiedBackPage)
            props.fetchQuestions({
              fromId: nextFromId,
            })
          }}
        >
          {'>'}
        </button>
      )}
    </div>
  )
}
