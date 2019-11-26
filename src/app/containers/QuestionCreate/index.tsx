import React, { FC } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { RootState } from '@/app/models'
import { postQuestion, QuestionDispatcher } from '@/app/actions/question'
import { login, logout, LoginDispatcher } from '@/app/actions/login'
import { paths } from '@/app/common/paths'
import { QuestionPost } from '@/app/components/QuestionPost'

interface StateProps {
  readonly id: string
}

interface DispatchProps {
  readonly postQuestion: QuestionDispatcher['postQuestion']
  readonly login: LoginDispatcher['login']
  readonly logout: LoginDispatcher['logout']
}

type QuestionCreateProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  id: state.loginState.id,
})

const mapDispatchToProps = {
  postQuestion,
  login,
  logout,
}

const QuestionCreate: FC<QuestionCreateProps> = (props: QuestionCreateProps) => {
  const handleLogin = () => {
    props.history.push(paths.login)
  }
  const handleLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }

  return (
    <div>
      <Header userId={props.id} handleLogin={handleLogin} handleLogout={handleLogout} />
      <QuestionPost userId={props.id} postQuestion={props.postQuestion} />
      <Footer />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreate)
