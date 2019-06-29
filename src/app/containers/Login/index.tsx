import React, { useState, useEffect, FC } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import { Header } from '@/app/components/Header'
import { login, DispatchLogin } from '@/app/actions/login'
import { RootState } from '@/app/models'
import words from '@/assets/strings'
import style from '@/app/containers/Login/style.scss'
import { Footer } from '@/app/components/Footer'

interface StateProps {
  readonly token: string
}

interface DispatchProps {
  readonly login: DispatchLogin
}

type LoginProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  token: state.loginState.token,
})

const mapDispatchToProps: DispatchProps = {
  login,
}

const Login: FC<LoginProps> = (props: LoginProps) => {
  const [loginId, setLoginId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (props.token) {
      props.history.push('/')
    }
  }, [props.token])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.login(loginId, password)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return
    }
    props.login(loginId, password)
  }

  const handleLoginIdChange = (e: React.ChangeEvent<HTMLInputElement>) => setLoginId(e.target.value)
  const handleLoginPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  return (
    <div className={style.container}>
      <Header title={words.login.title} userId="" icon={faSignInAlt} />
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <div>
          <input
            className={style.inputId}
            type="text"
            autoComplete="username"
            onChange={handleLoginIdChange}
            onKeyPress={handleKeyPress}
            placeholder={words.login.idPlaceholder}
            value={loginId}
          />
        </div>
        <label>Password:</label>
        <div>
          <input
            className={style.inputPassword}
            type="password"
            autoComplete="current-password"
            onChange={handleLoginPasswordChange}
            onKeyPress={handleKeyPress}
            placeholder={words.login.passwordPlaceholder}
            value={password}
          />
        </div>
        <button type="submit" className={style.loginButton}>
          {words.todoApp.login}
        </button>
      </form>
      <Footer copyright="@diescake" />
    </div>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
)
