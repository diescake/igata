import React, { FC, useState, ChangeEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { VoteItem } from '@/app/components/VoteItem'
import style from '@/app/components/QuestionDetailItem/style.scss'
import { Question, Comment } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'
import { QuestionDispatcher } from '@/app/actions/question'
import { CommentItem } from '@/app/components/CommentItem'
import { CommentForm } from '@/app/components/CommentForm'
import { VoteDispatcher } from '@/app/actions/vote'
import { CommentDispatcher } from '@/app/actions/comment'

type Props = {
  readonly userId: string
  readonly questionId: string
  readonly question: Question
  readonly putQuestion: QuestionDispatcher['putQuestion']
  readonly postCommentQuestion: CommentDispatcher['postCommentQuestion']
  readonly putCommentQuestion: CommentDispatcher['putCommentQuestion']
  readonly postVote: VoteDispatcher['postVote']
} & RouteComponentProps

export const QuestionDetailItemBase: FC<Props> = (props: Props) => {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [isUpdateQuestion, setIsUpdateQuestion] = useState<boolean>(false)
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)

  const handlePutClick = () => {
    // 質問のタイトルと本文を更新
    if (typeof title !== 'undefined' && typeof body !== 'undefined') {
      props.putQuestion(title, body, props.questionId)
    }
    setIsUpdateQuestion(false)
    setTitle('')
    setBody('')
  }

  return (
    <div>
      {/* 質問 */}
      <div className={style.question}>
        {/* タイトル */}
        {isUpdateQuestion && (
          <>
            <input
              id="form-title"
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
              userId={props.userId}
              questionId={props.questionId}
              likeVoterIds={props.question.likeVoterIds}
              dislikeVoterIds={props.question.dislikeVoterIds}
              postVote={props.postVote}
            />
          </div>

          {/* コンテンツエリア */}
          <div className={style.contentArea}>
            {!isUpdateQuestion && (
              <>
                {/* 本文 */}
                <div>{props.question.body}</div>

                {/* 追加した日 */}
                <div className={style.additional}>
                  {words.common.additional(props.question.createdAt)}
                  {words.common.by}
                  <a
                    href="/"
                    onClick={e => {
                      props.history.push(paths.user + props.question.userId)
                      e.preventDefault()
                    }}
                  >
                    {props.question.userId}
                  </a>
                </div>

                <span>
                  {/* TODO: 同じidなら編集可能にする */}
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
                userId={props.userId}
                questionId={props.question.id}
                putCommentQuestion={props.putCommentQuestion}
                id={props.questionId}
              />
            ))}

            <CommentForm
              userId={props.userId}
              postCommentQuestion={props.postCommentQuestion}
              questionId={props.question.id}
              id={props.questionId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export const QuestionDetailItem = withRouter(QuestionDetailItemBase)
