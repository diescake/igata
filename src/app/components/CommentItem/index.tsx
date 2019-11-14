import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import style from '@/app/components/CommentItem/style.scss'
import { Comment } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'

type Props = {
  readonly comment: Comment
} & RouteComponentProps

export const CommentItemBase: FC<Props> = (props: Props) => (
  <div>
    <div className={style.body}>{props.comment.body}</div>
    <div className={style.additional}>
      {words.common.additional(props.comment.createdAt)}
      {words.common.by}
      <a
        href="/"
        onClick={e => {
          props.history.push(paths.user + props.comment.userId)
          e.preventDefault()
        }}
      >
        {props.comment.userId}
      </a>
    </div>
    <hr />
  </div>
)
export const CommentItem = withRouter(CommentItemBase)
