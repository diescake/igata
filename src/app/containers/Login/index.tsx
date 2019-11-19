import React, { useEffect, FC } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Header } from '@/app/components/Header'
import { LoginForm } from '@/app/components/LoginForm'
import { Footer } from '@/app/components/Footer'
import { login, LoginDispatcher } from '@/app/actions/login'
import { RootState } from '@/app/models'
import { paths } from '@/app/common/paths'
import words from '@/assets/strings'
import style from '@/app/containers/Login/style.scss'

interface StateProps {
  readonly key: string
}

interface DispatchProps {
  readonly login: LoginDispatcher['login']
}

type LoginProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  key: state.loginState.session.key,
})

const mapDispatchToProps: DispatchProps = {
  login,
}

const Login: FC<LoginProps> = (props: LoginProps) => {
  useEffect(() => {
    if (props.key) {
      props.history.push(paths.root)
    }
  }, [props.key])

  return (
    <div className={style.container}>
      <Header title={words.login.title} />
      <LoginForm login={props.login} />
      <Footer />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
