import React, { FC } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import style from '@/app/components/QuestionListItem/style.scss'
import { Question } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'
import { QuestionDispatcher } from '@/app/actions/question'
import { AnswerDispatcher } from '@/app/actions/answer'

type Props = {
  readonly question: Question
  readonly isUserIdShow?: boolean
  readonly loadingQuestion: QuestionDispatcher['loadingQuestion']
  readonly loadingAnswer: AnswerDispatcher['loadingAnswer']
} & RouteComponentProps

const QuestionListItemBase: FC<Props> = (props: Props) => (
  <div>
    <h5 className={style.title}>
      <Link
        to={`${paths.question}${props.question.id}`}
        onClick={() => {
          props.loadingQuestion()
          props.loadingAnswer()
        }}
      >
        {props.question.title}
      </Link>
    </h5>

    <div className={style.additional}>
      {words.common.additional(props.question.createdAt)}
      {props.isUserIdShow && (
        <>
          {words.common.by}
          <Link to={`${paths.user}${props.question.userId}`}>{props.question.userId}</Link>
        </>
      )}
      <hr className={style.hr} />
    </div>
  </div>
)
export const QuestionListItem = withRouter(QuestionListItemBase)
