import React, { FC } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import style from '@/app/components/QuestionListItem/style.scss'
import { Question } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'

type Props = {
  readonly question: Question
  readonly isUserIdShow?: boolean
} & RouteComponentProps

const QuestionListItemBase: FC<Props> = (props: Props) => (
  <div>
    <h5 className={style.title}>
      <Link to={`${paths.question}${props.question.id}`}>{props.question.title}</Link>
    </h5>

    <div className={style.additional}>
      {words.common.additional(props.question.createdAt)}
      {props.isUserIdShow && (
        <>
          {words.common.by}
          <Link to={`${paths.user}${props.question.userId}`}>{props.question.userId}</Link>
        </>
      )}
      <hr />
    </div>
  </div>
)
export const QuestionListItem = withRouter(QuestionListItemBase)
