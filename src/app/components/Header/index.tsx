import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import words from '@/assets/strings'
import style from '@/app/components/Header/style.scss'
import { paths } from '@/app/common/paths'

type Props = {
  readonly title: string
  readonly icon?: IconDefinition
  readonly userId?: string
  readonly handlerLogin?: () => void
  readonly handlerLogout?: () => void
} & RouteComponentProps

const HeaderBase: FC<Props> = (props: Props) => (
  <div>
    <nav className={style.navDefault}>
      <a
        href="/"
        onClick={e => {
          props.history.push(paths.top)
          e.preventDefault()
        }}
      >
        {words.header.title}
      </a>
      <div className={style.formLine}>
        <div className={style.navbarText}>
          <span>
            {!props.userId && typeof props.handlerLogin !== 'undefined' && (
              <a
                href="/"
                onClick={e => {
                  if (props.handlerLogin) {
                    props.handlerLogin()
                  }
                  e.preventDefault()
                  return false
                }}
                className={style.loginLink}
              >
                {words.header.login}
              </a>
            )}

            {props.userId && typeof props.handlerLogout !== 'undefined' && (
              <a
                href="/"
                onClick={e => {
                  console.log('logout')
                  console.log(props.handlerLogout)
                  if (props.handlerLogout) {
                    props.handlerLogout()
                  }
                  e.preventDefault()
                }}
                className={style.loginLink}
              >
                {words.header.logout}
              </a>
            )}
          </span>
        </div>
      </div>
    </nav>
    {props.userId && <b>{words.todoApp.loginMessage(props.userId)}</b>}
  </div>
)

export const Header = withRouter(HeaderBase)
