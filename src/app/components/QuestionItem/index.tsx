import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import style from '@/app/components/QuestionItem/style.scss'
import { Question } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'

type Props = {
  readonly question: Question
  readonly isUserIdShow?: boolean
  readonly isBody?: boolean
} & RouteComponentProps

export const QuestionItemBase: FC<Props> = (props: Props) => (
  <div>
    {/* タイトル */}
    {!props.isBody && (
      <>
        <h5 className={style.title}>
          <a
            href="/"
            onClick={e => {
              props.history.push(paths.question + props.question.id)
              e.preventDefault()
            }}
          >
            {props.question.title}
          </a>
        </h5>
      </>
    )}

    {/* 本文 */}
    {props.isBody && <div>{props.question.body}</div>}

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
      <hr />
    </div>
  </div>
)
export const QuestionItem = withRouter(QuestionItemBase)
