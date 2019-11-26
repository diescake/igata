import React, { FC, useState, ChangeEvent } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import clsx from 'clsx'
import style from '@/app/components/AnswerItem/style.scss'
import { Answer } from '@/app/models/Answer'
import words from '@/assets/strings'
import { paths } from '@/app/common/paths'
import { AnswerDispatcher } from '@/app/actions/answer'

type Props = {
  // 回答データ
  readonly answer: Answer
  // 質問ID
  readonly questionId?: string
  // 質問の詳細画面
  readonly isQuestionDetail?: boolean
  //  ユーザー詳細画面
  readonly isUserDetail?: boolean
  // ログインユーザーID
  readonly userId?: string
  // 回答を更新
  readonly putAnswer?: AnswerDispatcher['putAnswer']
} & RouteComponentProps

export const AnswerItemBase: FC<Props> = (props: Props) => {
  // 回答更新時に使用
  const [body, setBody] = useState<string>('')
  const [isUpdateAnswer, setIsUpdateAnswer] = useState<boolean>(false)
  const [isBodyErrorEmpty, setIsBodyErrorEmpty] = useState<boolean>(false)

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)
  const handlePutClick = () => {
    if (props.putAnswer && body && props.answer.id && props.questionId) {
      // 回答を更新
      props.putAnswer(body, props.answer.id, props.questionId)

      setIsUpdateAnswer(false)
      setBody('')
    }
    setIsBodyErrorEmpty(!body)
  }

  return (
    <div>
      {!isUpdateAnswer && (
        <>
          {/* リンクあり */}
          {props.isUserDetail && (
            <>
              <h5 className={style.title}>
                <Link to={`${paths.question}${props.answer.id}`}>{props.answer.body}</Link>
              </h5>
            </>
          )}
          {/* リンクがない場合 */}
          {!props.isUserDetail && <div className={style.body}> {` ${props.answer.body}`}</div>}

          <div className={style.additional}>
            {words.common.additional(props.answer.createdAt)}
            {/* 投稿したユーザーID */}
            {props.isQuestionDetail && (
              <>
                {words.common.by}
                <Link to={`${paths.user}${props.answer.userId}`}>{props.answer.userId}</Link>

                {/* 同じidで質問画面なら編集可能にする */}
                {props.userId === props.answer.userId && props.questionId && (
                  <span>
                    <button
                      type="button"
                      className={style.buttonUpdate}
                      onClick={() => {
                        setBody(props.answer.body)
                        setIsUpdateAnswer(true)
                      }}
                    >
                      {words.common.update}
                    </button>
                  </span>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* 回答を更新 */}
      {isUpdateAnswer && (
        <>
          {isBodyErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
          <form>
            <input
              maxLength={3000}
              minLength={1}
              required
              className={clsx(style.edit, style.formControl)}
              type="text"
              onChange={handleTextChange}
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
                  setIsUpdateAnswer(false)
                  setIsBodyErrorEmpty(false)
                }}
              >
                {words.common.cancel}
              </button>
            </div>
          </form>
        </>
      )}
      <hr className={style.hr} />
    </div>
  )
}

export const AnswerItem = withRouter(AnswerItemBase)