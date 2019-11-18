import React, { FC, useEffect, ChangeEvent, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import { Header } from '@/app/components/Header'
import { fetchQuestion, putQuestion, QuestionDispatcher } from '@/app/actions/question'
import { fetchAnswers, postAnswer, putAnswer, AnswerDispatcher } from '@/app/actions/answer'
import { RootState } from '@/app/models'
import words from '@/assets/strings'
import style from '@/app/containers/Question/style.scss'
import { VoteItem } from '@/app/components/VoteItem'
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
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {
  useEffect(() => {
    props.fetchQuestion(`/${props.match.params.id}`)
    props.fetchAnswers(`?question_id=${props.match.params.id}`)
  }, [])
  const answerNumber = props.answers.length

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [isUpdateQuestion, setIsUpdateQuestion] = useState<boolean>(false)
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)

  const handlePutClick = () => {
    // 質問のタイトルと本文を更新
    if (typeof title !== 'undefined' && typeof body !== 'undefined') {
      props.putQuestion(title, body, props.match.params.id)
    }
    setIsUpdateQuestion(false)
    setTitle('')
    setBody('')
  }

  return (
    <div className={style.container}>
      <Header title={words.login.title} icon={faSignInAlt} />
      <div className={style.main}>
        {/* 質問 */}
        <div className={style.question}>
          {/* タイトル */}
          {isUpdateQuestion && (
            <>
              <input
                id="updateQuestionTitle"
                maxLength={3000}
                minLength={1}
                required
                className={`${style.titleEdit} ${style.formControl}`}
                type="text"
                onChange={handleTitleChange}
                value={title}
              />
            </>
          )}
          {!isUpdateQuestion && <div className={style.pageTitle}>{props.question.title}</div>}
          <hr />

          {/* メインエリア */}
          <div className={style.mainArea}>
            {/* 情報エリア */}
            <div className={style.infoArea}>
              {/* 評価 */}
              <VoteItem
                userId={props.id}
                questionId={props.match.params.id}
                likeVoterIds={props.question.likeVoterIds}
                dislikeVoterIds={props.question.dislikeVoterIds}
                postVote={props.postVote}
              />
            </div>

            {/* コンテンツエリア */}
            <div className={style.contentArea}>
              {!isUpdateQuestion && (
                <>
                  <QuestionDetailItem question={props.question} isUserIdShow />

                  <span>
                    {/* 同じidなら編集可能にする */}
                    <button
                      type="button"
                      onClick={e => {
                        setTitle(props.question.title)
                        setBody(props.question.body)
                        setIsUpdateQuestion(true)
                        e.preventDefault()
                      }}
                    >
                      更新
                    </button>
                  </span>
                </>
              )}
              {/* 質問のタイトル更新 */}
              {isUpdateQuestion && (
                <>
                  <form>
                    <textarea
                      id="body"
                      maxLength={3000}
                      minLength={1}
                      required
                      className={`${style.bodyEdit} ${style.formControl}`}
                      onChange={handleBodyChange}
                      value={body}
                    />
                    <div className={style.formGroup}>
                      <button type="button" className={style.btnPrimary} onClick={handlePutClick}>
                        保存
                      </button>
                    </div>
                  </form>
                  <button
                    type="button"
                    className={style.btnPrimary}
                    onClick={e => {
                      setIsUpdateQuestion(false)
                      e.preventDefault()
                    }}
                  >
                    キャンセル
                  </button>
                </>
              )}

              <hr />

              {props.question.comments.map((comment: Comment) => (
                <CommentItem
                  comment={comment}
                  userId={props.id}
                  questionId={props.question.id}
                  putCommentQuestion={props.putCommentQuestion}
                  id={props.match.params.id}
                />
              ))}
              <CommentForm
                userId={props.id}
                postCommentQuestion={props.postCommentQuestion}
                questionId={props.question.id}
                id={props.match.params.id}
              />
            </div>
          </div>
        </div>

        {/* 回答一覧 */}
        <div className={style.answerList}>
          <div className={style.answerListTitle}>{words.question.answerNumber(answerNumber)}</div>
          <hr />
          {/* 回答 */}
          <span>
            {props.answers.map((answer: Answer) => (
              <>
                <AnswerItem answer={answer} isUserIdShow />
                {answer.comments.map((comment: Comment) => (
                  <CommentItem
                    comment={comment}
                    userId={props.id}
                    putCommentAnswer={props.putCommentAnswer}
                    id={props.match.params.id}
                    answerId={answer.id}
                  />
                ))}
                <CommentForm
                  userId={props.id}
                  postCommentAnswer={props.postCommentAnswer}
                  id={props.match.params.id}
                  answerId={answer.id}
                />
              </>
            ))}
          </span>
        </div>
        {/* 回答する */}
        <div className={style.newAnswer}>
          <div className="new-answer-title">{words.question.answer}</div>
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
)(Question)
