import React, { FC, useState, ChangeEvent } from 'react'
import style from '@/app/components/CommentForm/style.scss'
import words from '@/assets/strings'

export interface Props {
  readonly userId: string
}

export const CommentForm: FC<Props> = (props: Props) => {
  const [text, setText] = useState<string>('')
  const handletTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handlepostQuestion = () => {}

  return (
    <div>
      {!props.userId && (
        <>
          <div className={style.commentList}>{words.question.loginToComment}</div>
        </>
      )}

      {props.userId && (
        <>
          <div>コメント追加</div>
          <form>
            <input
              id="new-comment"
              maxLength={3000}
              minLength={1}
              required
              className={`${style.titleEdit} ${style.formControl}`}
              type="text"
              onChange={handletTextChange}
              value={text}
            />
            <div className={style.formGroup}>
              <button type="submit" className={style.btnPrimary} onClick={handlepostQuestion}>
                {words.todoApp.addTodo}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
