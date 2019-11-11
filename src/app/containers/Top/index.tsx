import React, { FC } from 'react'
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
// import { paths } from '@/app/common/paths'
import { login, LoginDispatcher } from '@/app/actions/login'

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
}

const Top: FC<TopProps> = (props: TopProps) => {
  return (
    <div className={style.container}>
      <Header title={words.todoApp.title} userId={props.userId} icon={faListAlt} />
      <div className={style.pageTitle}>質問を見る</div>

      <ListWrapper loading={props.fetching}>
        {props.questions.map((question: Question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </ListWrapper>
      <Footer />
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top))
