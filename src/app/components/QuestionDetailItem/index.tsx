import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import style from '@/app/components/QuestionDetailItem/style.scss'
import { Question } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'

type Props = {
  readonly question: Question
  readonly isUserIdShow?: boolean
} & RouteComponentProps

export const QuestionDetailItemBase: FC<Props> = (props: Props) => (
  <div>
    {/* 本文 */}
    <div>{props.question.body}</div>

    {/* 追加した日 */}
    <div className={style.additional}>
      {words.common.additional(props.question.createdAt)}
      {/* 投稿したユーザーID */}
      {props.isUserIdShow && (
        <>
          {words.common.by}
          <a
            href="/"
            onClick={e => {
              props.history.push(paths.user + props.question.userId)
              e.preventDefault()
            }}
          >
            {props.question.userId}
          </a>
        </>
      )}
    </div>
  </div>
)
export const QuestionDetailItem = withRouter(QuestionDetailItemBase)
