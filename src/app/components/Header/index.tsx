import React, { FC } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import words from '@/assets/strings'
import style from '@/app/components/Header/style.scss'
import { paths } from '@/app/common/paths'

type Props = {
  readonly title: string
  readonly icon?: IconDefinition
  readonly userId?: string
  readonly handleLogin?: () => void
  readonly handleLogout?: () => void
} & RouteComponentProps

const HeaderBase: FC<Props> = (props: Props) => (
  <div>
    <nav className={style.navDefault}>
      <Link to={paths.root}>{words.header.title}</Link>
      <div className={style.formLine}>
        <div className={style.navbarText}>
          <span>
            {!props.userId && props.handleLogin && (
              <button
                type="button"
                className={style.loginLink}
                onClick={() => {
                  if (props.handleLogin) {
                    props.handleLogin()
                  }
                }}
              >
                {words.header.login}
              </button>
            )}

            {props.userId && props.handleLogout && (
              <button
                type="button"
                className={style.loginLink}
                onClick={() => {
                  if (props.handleLogout) {
                    props.handleLogout()
                  }
                }}
              >
                {words.header.logout}
              </button>
            )}
          </span>
        </div>
      </div>
    </nav>
    {props.userId && <b>{words.todoApp.loginMessage(props.userId)}</b>}
  </div>
)

export const Header = withRouter(HeaderBase)
