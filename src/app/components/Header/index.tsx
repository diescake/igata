import React, { FC } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import words from '@/assets/strings'
import style from '@/app/components/Header/style.scss'

interface Props {
  readonly title: string
  readonly icon?: IconDefinition
  readonly userId: string
}

export const Header: FC<Props> = (props: Props) => {
  return (
    <div>
      <h1 className={style.header}>
        {props.icon && <FontAwesomeIcon className={style.icon} icon={props.icon} />}
        {props.title}
      </h1>
      {props.userId && <b>{words.todoApp.loginMessage(props.userId)}</b>}
    </div>
  )
}
