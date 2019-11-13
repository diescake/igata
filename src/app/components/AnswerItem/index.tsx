import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import style from '@/app/components/QuestionItem/style.scss'
import { Answer } from '@/app/models/Answer'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'

type Props = {
  readonly answer: Answer
} & RouteComponentProps

export const AnswerItemBase: FC<Props> = (props: Props) => (
  <div>
    <h5 className={style.title}>
      <a
        href="/"
        onClick={e => {
          props.history.push(paths.question + props.answer.id)
          e.preventDefault()
        }}
      >
        {props.answer.body}
      </a>
    </h5>

    <div className={style.additional}>
      {words.common.additional(props.answer.createdAt)}
      <hr />
    </div>
  </div>
)

export const AnswerItem = withRouter(AnswerItemBase)
