import React, { FC } from 'react'
import style from '@/app/components/QuestionItem/style.scss'
import { Question } from '@/app/models/Question'

interface Props {
  readonly question: Question
}

export const QuestionItem: FC<Props> = ({ question }: Props) => (
  <div>
    <h5 className={style.title}>
      <a href="/">{question.title}</a>
    </h5>

    <div className={style.additional}>
      {question.createdAt}
      <a href="/">{question.userId}</a>
      <hr />
    </div>
  </div>
)
