import React, { FC, ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import words from '@/assets/strings'
import style from '@/app/containers/QuestionCreate/style.scss'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { RootState } from '@/app/models'
import { postQuestion, QuestionDispatcher } from '@/app/actions/question'

interface StateProps {
  readonly id: string
  readonly fetching: boolean
}

interface DispatchProps {
  readonly postQuestion: QuestionDispatcher['postQuestion']
}

type QuestionCreateProps = StateProps & DispatchProps

const mapStateToProps = (state: RootState): StateProps => ({
  fetching: state.todoState.fetching,
  id: state.loginState.id,
})

const mapDispatchToProps = {
  postQuestion,
}

const QuestionCreate: FC<QuestionCreateProps> = (props: QuestionCreateProps) => {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const handlePostQuestion = () => {
    props.postQuestion(title, body)
  }

  return (
    <div className={style.container}>
      <Header title={words.todoApp.title} userId={props.id} icon={faListAlt} />
      <div className={style.main}>
        {!props.id && (
          <>
            <div>質問投稿する</div>
            <div>質問を投稿するにはログインしてください。</div>
          </>
        )}

        {props.id && (
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
                onChange={handleTitleChange}
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
                onChange={handleTextChange}
                value={body}
              />
              <br />
              <div className={style.formGroup}>
                <button type="button" className={style.btnPrimary} onClick={handlePostQuestion}>
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
