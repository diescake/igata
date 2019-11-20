import React, { FC, useState, ChangeEvent } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import style from '@/app/components/AnswerItem/style.scss'
import { Answer } from '@/app/models/Answer'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'
import { AnswerDispatcher } from '@/app/actions/answer'

type Props = {
  // 回答データ
  readonly answer: Answer
  // ユーザーIDを表示する
  readonly isUserIdShow?: boolean
  // 回答をリンクにする
  readonly isAnswerLink?: boolean
  // ログインユーザーID
  readonly userId?: string
  // 回答を更新
  readonly putAnswer?: AnswerDispatcher['putAnswer']
} & RouteComponentProps

export const AnswerItemBase: FC<Props> = (props: Props) => {
  // 回答更新時に使用
  const [text, setText] = useState<string>('')
  const [isUpdateAnswer, setIsUpdateAnswer] = useState<boolean>(false)
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handlePutClick = () => {
    if (typeof props.putAnswer !== 'undefined' && props.answer.id && props.answer.questionId) {
      // 回答を更新
      props.putAnswer(`${paths.answer}/${props.answer.id}`, text, props.answer.questionId)
    }
    setIsUpdateAnswer(false)
    setText('')
  }

  return (
    <div>
      {/* リンクあり */}
      {props.isAnswerLink && (
        <>
          <h5 className={style.title}>
            <Link to={`${paths.question}${props.answer.id}`}>{props.answer.body}</Link>
          </h5>
        </>
      )}

      {/* リンクがない場合 */}
      {!props.isAnswerLink && <div>{props.answer.body}</div>}

      <div className={style.additional}>
        {words.common.additional(props.answer.createdAt)}
        {/* 投稿したユーザーID */}
        {props.isUserIdShow === true && (
          <>
            {words.common.by}
            <Link to={`${paths.user}${props.answer.userId}`}>{props.answer.userId}</Link>

            {/* 同じidなら編集可能にする */}
            {props.userId === props.answer.userId && (
              <span>
                <button
                  type="button"
                  onClick={e => {
                    setText(props.answer.body)
                    setIsUpdateAnswer(true)
                    e.preventDefault()
                  }}
                >
                  {words.common.update}
                </button>
              </span>
            )}
          </>
        )}
        <hr />
      </div>

      {/* 回答を更新 */}
      {isUpdateAnswer && (
        <>
          <form>
            <input
              id="updateAnswer"
              maxLength={3000}
              minLength={1}
              required
              className={`${style.titleEdit} ${style.formControl}`}
              type="text"
              onChange={handleTextChange}
              value={text}
            />
            <div className={style.formGroup}>
              <button type="button" className={style.btnPrimary} onClick={handlePutClick}>
                {words.common.save}
              </button>
            </div>
          </form>
          <button
            type="button"
            className={style.btnPrimary}
            onClick={e => {
              setIsUpdateAnswer(false)
              e.preventDefault()
            }}
          >
            {words.common.cancel}
          </button>
        </>
      )}
    </div>
  )
}

export const AnswerItem = withRouter(AnswerItemBase)
