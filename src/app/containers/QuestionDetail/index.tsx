import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Header } from '@/app/components/Header'
import { fetchQuestion, putQuestion, QuestionDispatcher } from '@/app/actions/question'
import { fetchAnswers, postAnswer, putAnswer, AnswerDispatcher } from '@/app/actions/answer'
import { RootState } from '@/app/models'
import words from '@/assets/strings'
import style from '@/app/containers/QuestionDetail/style.scss'
import { Question as QuestionModel, Comment } from '@/app/models/Question'
import { CommentItem } from '@/app/components/CommentItem'
import { Answer } from '@/app/models/Answer'
import { AnswerItem } from '@/app/components/AnswerItem'
import { CommentForm } from '@/app/components/CommentForm'
import { AnswerForm } from '@/app/components/AnswerForm'
import {
  postCommentQuestion,
  putCommentQuestion,
  postCommentAnswer,
  putCommentAnswer,
  CommentDispatcher,
} from '@/app/actions/comment'
import { postVote, VoteDispatcher } from '@/app/actions/vote'
import { QuestionDetailItem } from '@/app/components/QuestionDetailItem'
import { login, logout, LoginDispatcher } from '@/app/actions/login'
import { paths } from '@/app/common/paths'

interface StateProps {
  readonly question: QuestionModel
  readonly answers: Answer[]
  readonly id: string
  readonly fetchingQuestion: boolean
  readonly fetchingAnswer: boolean
}

interface DispatchProps {
  readonly fetchQuestion: QuestionDispatcher['fetchQuestion']
  readonly putQuestion: QuestionDispatcher['putQuestion']
  readonly fetchAnswers: AnswerDispatcher['fetchAnswers']
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
  fetchingAnswer: state.answerState.fetching,
  id: state.loginState.id,
})

const mapDispatchToProps: DispatchProps = {
  fetchQuestion,
  putQuestion,
  fetchAnswers,
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
  useEffect(() => {
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
  const answerNumber = props.answers.length

  return (
    <div className={style.container}>
      <Header title={words.todoApp.title} userId={props.id} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div className={style.main}>
        <QuestionDetailItem
          userId={props.id}
          questionId={props.match.params.id}
          question={props.question}
          putQuestion={props.putQuestion}
          postCommentQuestion={props.postCommentQuestion}
          putCommentQuestion={props.putCommentQuestion}
          postVote={props.postVote}
        />

        <div className={style.answerList}>
          <div className={style.answerListTitle}>{words.question.answerNumber(answerNumber)}</div>
          <hr />
          <span>
            {props.answers.map((answer: Answer) => (
              <>
                <AnswerItem answer={answer} isUserIdShow />
                {answer.comments.map((comment: Comment) => (
                  <CommentItem
                    comment={comment}
                    userId={props.id}
                    putCommentAnswer={props.putCommentAnswer}
                    questionId={props.match.params.id}
                    answerId={answer.id}
                  />
                ))}
                <CommentForm
                  userId={props.id}
                  postCommentAnswer={props.postCommentAnswer}
                  questionId={props.match.params.id}
                  answerId={answer.id}
                />
              </>
            ))}
          </span>
        </div>

        <div className={style.newAnswer}>
          <div>{words.question.answer}</div>
          <hr />
          <AnswerForm userId={props.id} questionId={props.match.params.id} postAnswer={props.postAnswer} />
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDetail)
