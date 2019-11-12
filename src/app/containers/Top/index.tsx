import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import { RouteComponentProps, withRouter } from 'react-router'

import { addQuestion, updateQuestion, deleteQuestion, fetchQuestions, QuestionDispatcher } from '@/app/actions/question'
import { Header } from '@/app/components/Header'
import { ListWrapper } from '@/app/components/ListWrapper'
import { Footer } from '@/app/components/Footer'

import { RootState } from '@/app/models'
import { Question } from '@/app/models/Question'
import words from '@/assets/strings'
import style from '@/app/containers/Top/style.scss'
import { QuestionItem } from '@/app/components/QuestionItem'
import { paths } from '@/app/common/paths'
import { login, logout, LoginDispatcher } from '@/app/actions/login'

interface StateProps {
  readonly questions: Question[]
  readonly userId: string
  readonly fetching: boolean
  readonly token: string
}

interface DispatchProps {
  readonly addQuestion: QuestionDispatcher['addQuestion']
  readonly updateQuestion: QuestionDispatcher['updateQuestion']
  readonly deleteQuestion: QuestionDispatcher['deleteQuestion']
  readonly fetchQuestions: QuestionDispatcher['fetchQuestions']
  readonly login: LoginDispatcher['login']
  readonly logout: LoginDispatcher['logout']
}

type TopProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  questions: state.questionState.questions,
  fetching: state.todoState.fetching,
  userId: state.loginState.userId,
  token: state.loginState.token,
})

const mapDispatchToProps = {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  fetchQuestions,
  login,
  logout,
}

const Top: FC<TopProps> = (props: TopProps) => {
  useEffect(() => {
    props.fetchQuestions()
  }, [])
  const handlerLogin = () => {
    props.history.push(paths.login)
  }
  const handlerLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }
  return (
    <div className={style.container}>
      <Header
        title={words.todoApp.title}
        userId={props.userId}
        icon={faListAlt}
        handlerLogin={handlerLogin}
        handlerLogout={handlerLogout}
      />
      <div className={style.main}>
        <div className={style.pageTitle}>{words.top.title}</div>
        <a
          href="/"
          onClick={e => {
            console.log('hoge')
            props.history.push(paths.questionCreate)
            e.preventDefault()
          }}
        >
          {words.top.question}
        </a>
        <hr />

        <ListWrapper loading={props.fetching}>
          {props.questions.map((question: Question) => (
            <QuestionItem key={question.id} question={question} />
          ))}
        </ListWrapper>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Top)
)
