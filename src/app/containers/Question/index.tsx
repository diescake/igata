import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import { Header } from '@/app/components/Header'
import { fetchQuestion, QuestionDispatcher } from '@/app/actions/question'
import { fetchAnswers, AnswerDispatcher } from '@/app/actions/answer'
import { RootState } from '@/app/models'
import words from '@/assets/strings'
import style from '@/app/containers/Question/style.scss'
import { VoteItem } from '@/app/components/VoteItem'
import { Question as QuestionModel, Comment } from '@/app/models/Question'
import { QuestionItem } from '@/app/components/QuestionItem'
import { CommentItem } from '@/app/components/CommentItem'
import { Answer } from '@/app/models/Answer'
import { AnswerItem } from '@/app/components/AnswerItem'
import { CommentForm } from '@/app/components/CommentForm'
import { AnswerForm } from '@/app/components/AnswerForm'

interface StateProps {
  readonly question: QuestionModel
  readonly answers: Answer[]
  readonly id: string
  readonly fetchingQuestion: boolean
  readonly fetchingAnswer: boolean
}

interface DispatchProps {
  readonly fetchQuestion: QuestionDispatcher['fetchQuestion']
  readonly fetchAnswers: AnswerDispatcher['fetchAnswers']
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
  fetchAnswers,
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {
  useEffect(() => {
    props.fetchQuestion(`/${props.match.params.id}`)
    props.fetchAnswers(`?question_id=${props.match.params.id}`)
  }, [])

  // ユーザーID表示する。
  const isUserIdShow = true
  // bodyテキストを使用する。
  const isBody = true
  // 回答のhrefを使用しない。
  const isHref = false

  const anserNumber = props.answers.length
  return (
    <div className={style.container}>
      <Header title={words.login.title} icon={faSignInAlt} />
      <div className={style.main}>
        {/* 質問 */}
        <div className={style.question}>
          {/* タイトル */}
          <div className={style.pageTitle}>{props.question.title}</div>
          <hr />

          {/* メインエリア */}
          <div className={style.mainArea}>
            {/* 情報エリア */}
            <div className={style.infoArea}>
              <VoteItem />
            </div>

            {/* コンテンツエリア */}
            <div className={style.contentArea}>
              <QuestionItem question={props.question} isUserIdShow={isUserIdShow} isBody={isBody} />
              {props.question.comments.map((comment: Comment) => (
                <CommentItem comment={comment} />
              ))}
              <CommentForm userId={props.id} />
            </div>
          </div>
        </div>

        {/* 回答一覧 */}
        <div className={style.answerList}>
          <div className={style.answerListTitle}>{words.question.answerNumber(anserNumber)}</div>
          <hr />
          {/* 回答 */}
          <span>
            {props.answers.map((answer: Answer) => (
              <>
                <AnswerItem answer={answer} isUserIdShow={isUserIdShow} isHref={isHref} />
                {answer.comments.map((comment: Comment) => (
                  <CommentItem comment={comment} />
                ))}
                <CommentForm userId={props.id} />
              </>
            ))}
          </span>
        </div>
        {/* 回答する */}
        <div className={style.newAnswer}>
          <div className="new-answer-title">{words.question.answer}</div>
          <hr />
          <AnswerForm userId={props.id} />
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)
