import React, { FC } from 'react'

import words from '@/assets/strings'
import style from '@/app/components/Header/style.scss'

interface Props {
  readonly title: string
  readonly userId: string
}

export const Header: FC<Props> = (props: Props) => {
  return (
    <div>
      <h1 className={style.header}>{props.title}</h1>
      {props.userId && <b>{words.todoApp.loginMessage(props.userId)}</b>}
    </div>
  )
}
