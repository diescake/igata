import React, { useEffect, FC } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Header } from '@/app/components/Header'
import { LoginForm } from '@/app/components/LoginForm'
import { Footer } from '@/app/components/Footer'
import { login, LoginDispatcher } from '@/app/actions/login'
import { RootState } from '@/app/models'
import { paths } from '@/app/common/paths'

interface StateProps {
  readonly token: string
}

interface DispatchProps {
  readonly login: LoginDispatcher['login']
}

type LoginProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  token: state.loginState.session.token,
})

const mapDispatchToProps: DispatchProps = {
  login,
}

const Login: FC<LoginProps> = (props: LoginProps) => {
  useEffect(() => {
    if (props.token) {
      props.history.replace(paths.root)
    }
  }, [props.token])

  return (
    <div>
      <Header />
      <LoginForm login={props.login} />
      <Footer />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
