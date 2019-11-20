import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import { Link } from 'react-router-dom'
import { fetchQuestions, QuestionDispatcher } from '@/app/actions/question'
import { Header } from '@/app/components/Header'
import { ListWrapper } from '@/app/components/ListWrapper'
import { Footer } from '@/app/components/Footer'

import { RootState } from '@/app/models'
import { Question } from '@/app/models/Question'
import words from '@/assets/strings'
import style from '@/app/containers/QuestionList/style.scss'
import { QuestionListItem } from '@/app/components/QuestionListItem'
import { QuestionPager } from '@/app/components/QuestionPager'

import { paths } from '@/app/common/paths'
import { login, logout, LoginDispatcher } from '@/app/actions/login'

interface StateProps {
  readonly questions: Question[]
  readonly id: string
  readonly fetching: boolean
  readonly token: string
}

interface DispatchProps {
  readonly fetchQuestions: QuestionDispatcher['fetchQuestions']
  readonly login: LoginDispatcher['login']
  readonly logout: LoginDispatcher['logout']
}

type QuestionListProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  questions: state.questionState.questions,
  fetching: state.questionState.fetching,
  id: state.loginState.id,
  token: state.loginState.session.key,
})

const mapDispatchToProps = {
  fetchQuestions,
  login,
  logout,
}
const QuestionList: FC<QuestionListProps> = (props: QuestionListProps) => {
  useEffect(() => {
    if (props.token) {
      props.history.push(paths.root)
    }
    props.fetchQuestions()
  }, [props.token])

  const handleLogin = () => {
    props.history.push(paths.login)
  }
  const handleLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }

  return (
    <div>
      <Header title={words.todoApp.title} userId={props.id} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div className={style.main}>
        <div className={style.pageTitle}>{words.top.title}</div>

        <Link to={`${paths.questionCreate}`}>{words.top.question}</Link>
        <hr />

        <ListWrapper loading={props.fetching}>
          {props.questions.map((question: Question) => (
            <QuestionListItem key={question.id} question={question} isUserIdShow />
          ))}
        </ListWrapper>
      </div>
      <QuestionPager questions={props.questions} fetchQuestions={props.fetchQuestions} />
      <Footer />
    </div>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionList)
)
