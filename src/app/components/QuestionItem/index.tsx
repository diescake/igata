import React, { FC } from 'react'
import style from '@/app/components/QuestionItem/style.scss'
import { Question } from '@/app/models/Question'
import words from '@/assets/strings'

interface Props {
  readonly question: Question
}

export const QuestionItem: FC<Props> = ({ question }: Props) => (
  <div>
    <h5 className={style.title}>
      <a href="/">{question.title}</a>
    </h5>

    <div className={style.additional}>
      {words.question.additional(question.createdAt)}
      <a href="/">{question.userId}</a>
      <hr />
    </div>
  </div>
)
