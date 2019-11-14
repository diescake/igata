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
  readonly id: string
  readonly fetching: boolean
  readonly key: string
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
  fetching: state.questionState.fetching,
  id: state.loginState.id,
  key: state.loginState.session.key,
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
  useEffect(() => {}, [props.key])

  useEffect(() => {
    if (props.key) {
      props.history.push(paths.root)
    } else {
      props.fetchQuestions()
    }
  }, [props.key])
  const handlerLogin = () => {
    props.history.push(paths.login)
  }
  const handlerLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }
  const isUserIdShow = true

  return (
    <div className={style.container}>
      <Header
        title={words.todoApp.title}
        userId={props.id}
        icon={faListAlt}
        handlerLogin={handlerLogin}
        handlerLogout={handlerLogout}
      />
      <div className={style.main}>
        <div className={style.pageTitle}>{words.top.title}</div>
        <a
          href="/"
          onClick={e => {
            props.history.push(paths.questionCreate)
            e.preventDefault()
          }}
        >
          {words.top.question}
        </a>
        <hr />

        <ListWrapper loading={props.fetching}>
          {props.questions.map((question: Question) => (
            <QuestionItem question={question} isUserIdShow={isUserIdShow} />
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
