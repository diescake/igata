import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import style from '@/app/components/QuestionItem/style.scss'
import { Question } from '@/app/models/Question'

interface Props {
  readonly question: Question
}

export const QuestionItem: FC<Props> = ({ question }: Props) => (
  <li className={style.list}>
    <a href="aaaa">{question.body}</a>
    <button className={style.deleteButton} type="button">
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
    <hr />
  </li>
)
