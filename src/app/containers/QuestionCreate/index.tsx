import React, { FC, ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import words from '@/assets/strings'
import style from '@/app/containers/QuestionCreate/style.scss'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { RootState } from '@/app/models'
import { QuestionDispatcher } from '@/app/actions/question'

interface StateProps {
  readonly userId: string
  readonly fetching: boolean
}

interface DispatchProps {
  readonly postQuestion: QuestionDispatcher['postQuestion']
}

type QuestionCreateProps = StateProps & DispatchProps

const mapStateToProps = (state: RootState): StateProps => ({
  fetching: state.todoState.fetching,
  userId: state.loginState.userId,
})

const mapDispatchToProps = {}

const QuestionCreate: FC<QuestionCreateProps> = (props: QuestionCreateProps) => {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const handletTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handletTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const handlepostQuestion = () => {
    props.postQuestion(title, body)
  }

  return (
    <div className={style.container}>
      <Header title={words.todoApp.title} userId={props.userId} icon={faListAlt} />
      <div className={style.main}>
        {!props.userId && (
          <>
            <div>質問投稿する</div>
            <div>質問を投稿するにはログインしてください。</div>
          </>
        )}

        {props.userId && (
          <>
            <div>タイトル</div>
            <br />
            <form>
              <input
                id="form-title"
                maxLength={100}
                minLength={1}
                required
                className={`${style.titleEdit} ${style.formControl}`}
                type="text"
                onChange={handletTitleChange}
                value={title}
              />
              <br />
              <div>本文</div>
              <br />
              <textarea
                id="form-body"
                maxLength={3000}
                minLength={1}
                required
                className={`${style.bodyEdit} ${style.formControl}`}
                onChange={handletTextChange}
                value={body}
              />
              <br />
              <div className={style.formGroup}>
                <button type="submit" className={style.btnPrimary} onClick={handlepostQuestion}>
                  {words.todoApp.addTodo}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCreate)
