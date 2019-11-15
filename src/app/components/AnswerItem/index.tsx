import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import style from '@/app/components/QuestionItem/style.scss'
import { Answer } from '@/app/models/Answer'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'

type Props = {
  readonly answer: Answer
  readonly isUserIdShow?: boolean
  readonly isHref?: boolean
} & RouteComponentProps

export const AnswerItemBase: FC<Props> = (props: Props) => (
  <div>
    {/* リンクあり */}
    {props.isHref && (
      <>
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
      </>
    )}

    {/* リンクがない場合 */}
    {!props.isHref && <div>{props.answer.body}</div>}

    <div className={style.additional}>
      {words.common.additional(props.answer.createdAt)}
      {/* 投稿したユーザーID */}
      {props.isUserIdShow === true && (
        <>
          {words.common.by}
          <a
            href="/"
            onClick={e => {
              props.history.push(paths.user + props.answer.userId)
              e.preventDefault()
            }}
          >
            {props.answer.userId}
          </a>
        </>
      )}
      <hr />
    </div>
  </div>
)

export const AnswerItem = withRouter(AnswerItemBase)
