import React, { FC } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import words from '@/assets/strings'
import style from '@/app/components/Header/style.scss'

interface Props {
  readonly title: string
  readonly icon?: IconDefinition
  readonly userId?: string
}

export const Header: FC<Props> = (props: Props) => (
  <div>
    <nav className={style.navDefault}>
      <a href="./top">StackoverFlowClone</a>
      <div className={style.formLine}>
        <div className={style.navbarText}>
          <span>
            {props.userId && (
              <a className={style.loginLink} href="/login">
                ログアウト
              </a>
            )}

            {!props.userId && (
              <a className={style.loginLink} href="/login">
                ログイン
              </a>
            )}
          </span>
        </div>
      </div>
    </nav>
    <h1 className={style.header}>
      {props.icon && <FontAwesomeIcon className={style.icon} icon={props.icon} />}
      {props.title}
    </h1>
    {props.userId && <b>{words.todoApp.loginMessage(props.userId)}</b>}
  </div>
)
