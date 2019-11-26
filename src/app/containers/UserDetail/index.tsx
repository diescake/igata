import React, { FC, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import { fetchQuestions, QuestionDispatcher } from '@/app/actions/question'
import { fetchAnswers, AnswerDispatcher } from '@/app/actions/answer'

import { Header } from '@/app/components/Header'
import { LoadingWrapper } from '@/app/components/LoadingWrapper'
import { Footer } from '@/app/components/Footer'

import { RootState } from '@/app/models'
import { Question } from '@/app/models/Question'
import { Answer } from '@/app/models/Answer'

import words from '@/assets/strings'
import style from '@/app/containers/UserDetail/style.scss'
import { QuestionItem } from '@/app/components/QuestionItem'
import { AnswerItem } from '@/app/components/AnswerItem'
import { paths } from '@/app/common/paths'
import { login, logout, LoginDispatcher } from '@/app/actions/login'
import { QuestionPager } from '@/app/components/QuestionPager'
import { constants } from '@/app/common/constants'

interface StateProps {
  readonly questions: Question[]
  readonly answers: Answer[]

  readonly id: string
  readonly isFetchingQuestion: boolean
  readonly isFetchingAnswer: boolean
  readonly token: string
}

interface DispatchProps {
  readonly fetchQuestions: QuestionDispatcher['fetchQuestions']
  readonly fetchAnswers: AnswerDispatcher['fetchAnswers']
  readonly login: LoginDispatcher['login']
  readonly logout: LoginDispatcher['logout']
}

type UserDetailProps = StateProps & DispatchProps & RouteComponentProps<{ userId: string }>

const mapStateToProps = (state: RootState): StateProps => ({
  questions: state.questionState.questions,
  answers: state.answerState.answers,
  isFetchingQuestion: state.questionState.isFetching,
  isFetchingAnswer: state.answerState.isFetching,
  id: state.loginState.id,
  token: state.loginState.session.token,
})

const mapDispatchToProps = {
  fetchQuestions,
  fetchAnswers,
  login,
  logout,
}

// ユーザー詳細画面
const UserDetail: FC<UserDetailProps> = (props: UserDetailProps) => {
  useLayoutEffect(() => {
    props.fetchQuestions({
      userId: props.match.params.userId,
    })
    props.fetchAnswers({
      userId: props.match.params.userId,
    })
  }, [])

  const handleLogin = () => {
    props.history.push(paths.login)
  }
  const handleLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }

  const fetching = props.isFetchingQuestion || props.isFetchingAnswer

  // コピーする
  const copyQuestions = [...props.questions]
  console.log(copyQuestions)
  // 数が11以上だと一つ削除する。
  if (copyQuestions.length >= constants.QUESTION_LIMIT) {
    // 末尾を削除する
    copyQuestions.pop()
  }

  return (
    <div>
      <Header userId={props.id} handleLogin={handleLogin} handleLogout={handleLogout} />

      <div className={style.main}>
        <div className={style.pageTitle}>{words.user.title}</div>
        <hr className={style.hr} />
        <LoadingWrapper loading={fetching}>
          {/* 質問一覧 */}
          <div className={style.listTitle}>{words.user.questionList}</div>
          {props.questions.map((question: Question) => (
            <QuestionItem key={question.id} question={question} isUserIdShow={false} />
          ))}

          {/* 回答一覧 */}
          <div className={style.listTitle}>{words.user.answerList}</div>
          {props.answers.map((answer: Answer) => (
            <AnswerItem key={answer.id} answer={answer} isUserDetail />
          ))}
        </LoadingWrapper>
      </div>

      <QuestionPager
        userId={props.id}
        questions={props.questions}
        fetchQuestions={props.fetchQuestions}
        isFetching={props.isFetchingQuestion}
      />
      <Footer />
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail))
