import React, { useState, useEffect, FC } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'

import { login, Login } from '@/app/actions/login'
import { RootState } from '@/app/models'
import words from '@/assets/strings'
import style from '@/app/containers/Login/style.scss'

interface StateProps {
  readonly token: string
}

interface DispatchProps {
  readonly login: Login
}

type LoginAppProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  token: state.loginState.token,
})

const mapDispatchToProps: DispatchProps = {
  login,
}

const LoginApp: FC<LoginAppProps> = (props: LoginAppProps) => {
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
      <h1 className={style.header}>{words.login.title}</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginApp)
)
