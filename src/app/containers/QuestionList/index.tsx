import React, { FC, useLayoutEffect } from 'react'
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
import { constants } from '@/app/common/constants'

interface StateProps {
  readonly questions: Question[]
  readonly id: string
  readonly isFetching: boolean
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
  isFetching: state.questionState.isFetching,
  id: state.loginState.id,
  token: state.loginState.session.token,
})

const mapDispatchToProps = {
  fetchQuestions,
  login,
  logout,
}
const QuestionList: FC<QuestionListProps> = (props: QuestionListProps) => {
  useLayoutEffect(() => {
    props.fetchQuestions()
  }, [props.token])

  const handleLogin = () => {
    props.history.push(paths.login)
  }
  const handleLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }
  // コピーする
  const copyQuestions = [...props.questions]
  console.log(copyQuestions)

  // 数が11以上だと一つ削除する。」
  if (copyQuestions.length >= constants.QUESTION_LIMIT) {
    // 末尾を削除する
    copyQuestions.pop()
  }

  return (
    <div>
      <Header userId={props.id} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div className={style.main}>
        <div className={style.pageTitle}>{words.top.title}</div>

        <Link to={`${paths.questionCreate}`}>{words.top.question}</Link>
        <hr className={style.hr} />

        <ListWrapper loading={props.isFetching}>
          {copyQuestions.map((question: Question) => (
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
