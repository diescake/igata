import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import { RouteComponentProps, withRouter } from 'react-router'

import { fetchQuestions, QuestionDispatcher } from '@/app/actions/question'
import { fetchAnswers, AnswerDispatcher } from '@/app/actions/answer'

import { Header } from '@/app/components/Header'
import { ListWrapper } from '@/app/components/ListWrapper'
import { Footer } from '@/app/components/Footer'

import { RootState } from '@/app/models'
import { Question } from '@/app/models/Question'
import { Answer } from '@/app/models/Answer'

import words from '@/assets/strings'
import style from '@/app/containers/User/style.scss'
import { QuestionListItem } from '@/app/components/QuestionListItem'
import { AnswerItem } from '@/app/components/AnswerItem'
import { paths } from '@/app/common/paths'
import { login, logout, LoginDispatcher } from '@/app/actions/login'

interface StateProps {
  readonly questions: Question[]
  readonly answers: Answer[]

  readonly id: string
  readonly fetchingQuestion: boolean
  readonly fetchingAnswer: boolean
  readonly key: string
}

interface DispatchProps {
  readonly fetchQuestions: QuestionDispatcher['fetchQuestions']
  readonly fetchAnswers: AnswerDispatcher['fetchAnswers']

  readonly login: LoginDispatcher['login']
  readonly logout: LoginDispatcher['logout']
}

type UserProps = StateProps & DispatchProps & RouteComponentProps<{ userId: string }>

const mapStateToProps = (state: RootState): StateProps => ({
  questions: state.questionState.questions,
  answers: state.answerState.answers,
  fetchingQuestion: state.questionState.fetching,
  fetchingAnswer: state.answerState.fetching,
  id: state.loginState.id,
  key: state.loginState.session.key,
})

const mapDispatchToProps = {
  fetchQuestions,
  fetchAnswers,
  login,
  logout,
}

// ユーザー詳細画面
const User: FC<UserProps> = (props: UserProps) => {
  useEffect(() => {
    props.fetchQuestions(props.match.params.userId)
    props.fetchAnswers(`?user_id=${props.match.params.userId}`)
  }, [])
  const handleLogin = () => {
    props.history.push(paths.login)
  }
  const handleLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }

  const fetching = props.fetchingAnswer && props.fetchingAnswer
  return (
    <div className={style.container}>
      <Header
        title={words.todoApp.title}
        userId={props.id}
        icon={faListAlt}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      <div className={style.main}>
        <div className={style.pageTitle}>{words.user.title}</div>
        <hr />
        <ListWrapper loading={fetching}>
          <div className={style.pageTitle}>{words.user.questionList}</div>
          {props.questions.map((question: Question) => (
            <QuestionListItem question={question} isUserIdShow={false} />
          ))}

          <div className={style.pageTitle}>{words.user.answerList}</div>
          {props.answers.map((answer: Answer) => (
            <AnswerItem answer={answer} isAnswerLink />
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
  )(User)
)