import React, { useEffect, FC } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import { Header } from '@/app/components/Header'
import { LoginForm } from '@/app/components/LoginForm'
import { Footer } from '@/app/components/Footer'
import { login, DispatchLogin } from '@/app/actions/login'
import { RootState } from '@/app/models'
import { paths } from '@/app/common/paths'
import words from '@/assets/strings'
import style from '@/app/containers/Login/style.scss'

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
  useEffect(() => {
    if (props.token) {
      props.history.push(paths.root)
    }
  }, [props.token])

  return (
    <div className={style.container}>
      <Header title={words.login.title} icon={faSignInAlt} />
      <LoginForm login={props.login} />
      <Footer />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
