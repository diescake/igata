import React, { FC, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Header } from '@/app/components/Header'
import { fetchQuestion, putQuestion, loadingQuestion, QuestionDispatcher } from '@/app/actions/question'
import { fetchAnswers, postAnswer, putAnswer, loadingAnswer, AnswerDispatcher } from '@/app/actions/answer'
import { RootState } from '@/app/models'
import words from '@/assets/strings'
import style from '@/app/containers/QuestionDetail/style.scss'
import { Question as QuestionModel } from '@/app/models/Question'
import { Answer } from '@/app/models/Answer'
import { AnswerPost } from '@/app/components/AnswerPost'
import {
  postCommentQuestion,
  putCommentQuestion,
  postCommentAnswer,
  putCommentAnswer,
  CommentDispatcher,
} from '@/app/actions/comment'
import { postVote, VoteDispatcher } from '@/app/actions/vote'
import { Question } from '@/app/components/QuestionDetail/Question'
import { login, logout, LoginDispatcher } from '@/app/actions/login'
import { paths } from '@/app/common/paths'
import { AnswerList } from '@/app/components/QuestionDetail/AnswerList'

interface StateProps {
  readonly question: QuestionModel
  readonly answers: Answer[]
  readonly id: string
  readonly fetchingQuestion: boolean
  readonly fetchingAnswer: boolean
  readonly isLoadingQuestion: boolean
  readonly isLoadingAnswer: boolean
}

interface DispatchProps {
  readonly fetchQuestion: QuestionDispatcher['fetchQuestion']
  readonly loadingQuestion: QuestionDispatcher['loadingQuestion']
  readonly putQuestion: QuestionDispatcher['putQuestion']
  readonly fetchAnswers: AnswerDispatcher['fetchAnswers']
  readonly loadingAnswer: AnswerDispatcher['loadingAnswer']
  readonly postCommentQuestion: CommentDispatcher['postCommentQuestion']
  readonly putCommentQuestion: CommentDispatcher['putCommentQuestion']
  readonly postCommentAnswer: CommentDispatcher['postCommentAnswer']
  readonly putCommentAnswer: CommentDispatcher['putCommentAnswer']
  readonly postAnswer: AnswerDispatcher['postAnswer']
  readonly putAnswer: AnswerDispatcher['putAnswer']
  readonly postVote: VoteDispatcher['postVote']
  readonly login: LoginDispatcher['login']
  readonly logout: LoginDispatcher['logout']
}

type QuestionProps = StateProps & DispatchProps & RouteComponentProps<{ id: string }>

const mapStateToProps = (state: RootState): StateProps => ({
  question: state.questionState.question,
  answers: state.answerState.answers,
  fetchingQuestion: state.questionState.fetching,
  isLoadingQuestion: state.questionState.loading,
  fetchingAnswer: state.answerState.fetching,
  isLoadingAnswer: state.answerState.loading,
  id: state.loginState.id,
})

const mapDispatchToProps: DispatchProps = {
  fetchQuestion,
  loadingQuestion,
  putQuestion,
  fetchAnswers,
  loadingAnswer,
  postCommentQuestion,
  putCommentQuestion,
  postCommentAnswer,
  putCommentAnswer,
  postAnswer,
  putAnswer,
  postVote,
  login,
  logout,
}

const QuestionDetail: FC<QuestionProps> = (props: QuestionProps) => {
  useLayoutEffect(() => {
    props.loadingQuestion()
    props.loadingAnswer()
    props.fetchQuestion(props.match.params.id)
    props.fetchAnswers({
      questionId: props.match.params.id,
    })
  }, [])
  const handleLogin = () => {
    props.history.push(paths.login)
  }
  const handleLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }
  if (!props.question.id) {
    return null
  }

  return (
    <div>
      <Header title={words.todoApp.title} userId={props.id} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div className={style.main}>
        <Question
          userId={props.id}
          questionId={props.match.params.id}
          question={props.question}
          putQuestion={props.putQuestion}
          postCommentQuestion={props.postCommentQuestion}
          putCommentQuestion={props.putCommentQuestion}
          postVote={props.postVote}
          isLoading={props.isLoadingQuestion}
        />
        <AnswerList
          userId={props.id}
          questionId={props.match.params.id}
          answers={props.answers}
          postCommentAnswer={props.postCommentAnswer}
          putCommentAnswer={props.putCommentAnswer}
          postAnswer={props.postAnswer}
          putAnswer={props.putAnswer}
          isLoading={props.isLoadingAnswer}
        />
        <AnswerPost userId={props.id} questionId={props.match.params.id} postAnswer={props.postAnswer} />
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDetail)
