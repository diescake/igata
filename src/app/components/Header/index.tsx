import React, { FC } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { faSignInAlt, faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import words from '@/assets/strings'
import style from '@/app/components/Header/style.scss'
import { paths } from '@/app/common/paths'

type Props = {
  readonly title: string
  readonly userId?: string
  readonly handleLogin?: () => void
  readonly handleLogout?: () => void
} & RouteComponentProps

const HeaderBase: FC<Props> = (props: Props) => (
  <div>
    <nav className={style.navDefault}>
      <Link to={paths.root}>
        <FontAwesomeIcon icon={faCog} />
        {words.header.title}
      </Link>
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
              <>
                <Link to={`${paths.user}${props.userId}`} className={style.icon}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>

                <button
                  type="button"
                  className={style.loginLink}
                  onClick={() => {
                    if (props.handleLogout) {
                      props.handleLogout()
                    }
                  }}
                >
                  <FontAwesomeIcon className={style.icon} icon={faSignInAlt} />
                </button>
              </>
            )}
          </span>
        </div>
      </div>
    </nav>
  </div>
)

export const Header = withRouter(HeaderBase)
