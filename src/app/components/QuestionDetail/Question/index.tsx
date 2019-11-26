import React, { FC, useState, ChangeEvent } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import clsx from 'clsx'
import { VoteItem } from '@/app/components/VoteItem'
import style from '@/app/components/QuestionDetail/Question/style.scss'
import { Question as QuestionModels, Comment } from '@/app/models/Question'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'
import { QuestionDispatcher } from '@/app/actions/question'
import { CommentItem } from '@/app/components/CommentItem'
import { CommentPost } from '@/app/components/CommentPost'
import { VoteDispatcher } from '@/app/actions/vote'
import { CommentDispatcher } from '@/app/actions/comment'

type Props = {
  readonly userId: string
  readonly questionId: string
  readonly question: QuestionModels
  readonly putQuestion: QuestionDispatcher['putQuestion']
  readonly postCommentQuestion: CommentDispatcher['postCommentQuestion']
  readonly putCommentQuestion: CommentDispatcher['putCommentQuestion']
  readonly postVote: VoteDispatcher['postVote']
} & RouteComponentProps

export const QuestionBase: FC<Props> = (props: Props) => {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [isUpdateQuestion, setIsUpdateQuestion] = useState<boolean>(false)
  const [isTitleErrorEmpty, setIsTitleErrorEmpty] = useState<boolean>(false)
  const [isBodyErrorEmpty, setIsBodyErrorEmpty] = useState<boolean>(false)
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)

  const handlePutClick = () => {
    // 質問のタイトルと本文を更新
    if (title && body) {
      props.putQuestion(title, body, props.questionId)
      setIsUpdateQuestion(false)
      setTitle('')
      setBody('')
    }
    setIsTitleErrorEmpty(!title)
    setIsBodyErrorEmpty(!body)
  }
  return (
    <div>
      <div className={style.question}>
        {isUpdateQuestion && (
          <>
            {isTitleErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
            <input
              maxLength={3000}
              minLength={1}
              required
              className={clsx(style.titleEdit, style.formControl)}
              type="text"
              onChange={handleTitleChange}
              value={title}
            />
          </>
        )}
        {!isUpdateQuestion && <div className={style.pageTitle}>{props.question.title}</div>}
        <hr className={style.hr} />
        <div className={style.mainArea}>
          <div className={style.infoArea}>
            <VoteItem
              userId={props.userId}
              questionId={props.questionId}
              likeVoterIds={props.question.likeVoterIds}
              dislikeVoterIds={props.question.dislikeVoterIds}
              postVote={props.postVote}
            />
          </div>

          <div className={style.contentArea}>
            {!isUpdateQuestion && (
              <>
                <div className={style.body}>{`  ${props.question.body}`}</div>

                <div className={style.additional}>
                  {words.common.additional(props.question.createdAt)}
                  {words.common.by}
                  <Link to={`${paths.user}${props.question.userId}`}>{props.question.userId}</Link>

                  {props.userId === props.question.userId && (
                    <>
                      <span>
                        <button
                          type="button"
                          className={style.buttonUpdate}
                          onClick={e => {
                            setTitle(props.question.title)
                            setBody(props.question.body)
                            setIsUpdateQuestion(true)
                            e.preventDefault()
                          }}
                        >
                          {words.common.update}
                        </button>
                      </span>
                    </>
                  )}
                </div>
              </>
            )}

            {/* 質問のタイトルと本文を更新 */}
            {isUpdateQuestion && (
              <>
                {isBodyErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
                <textarea
                  maxLength={3000}
                  minLength={1}
                  required
                  className={clsx(style.bodyEdit, style.formControl)}
                  onChange={handleBodyChange}
                  value={body}
                />
                <div className={style.formGroup}>
                  <button type="button" className={style.buttonSave} onClick={handlePutClick}>
                    {words.common.save}
                  </button>
                  <button
                    type="button"
                    className={style.buttonCancel}
                    onClick={() => {
                      setIsUpdateQuestion(false)
                      setIsTitleErrorEmpty(false)
                      setIsBodyErrorEmpty(false)
                    }}
                  >
                    {words.common.cancel}
                  </button>
                </div>
              </>
            )}

            <hr className={style.hr} />
            {props.question.comments.map((comment: Comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                userId={props.userId}
                questionId={props.questionId}
                putCommentQuestion={props.putCommentQuestion}
              />
            ))}
            <CommentPost userId={props.userId} postCommentQuestion={props.postCommentQuestion} questionId={props.questionId} />
          </div>
        </div>
      </div>
    </div>
  )
}
export const Question = withRouter(QuestionBase)
