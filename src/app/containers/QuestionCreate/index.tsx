import React, { FC, ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import words from '@/assets/strings'
import style from '@/app/containers/QuestionCreate/style.scss'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { RootState } from '@/app/models'
import { postQuestion, QuestionDispatcher } from '@/app/actions/question'
import { login, logout, LoginDispatcher } from '@/app/actions/login'
import { paths } from '@/app/common/paths'

interface StateProps {
  readonly id: string
  readonly fetching: boolean
}

interface DispatchProps {
  readonly postQuestion: QuestionDispatcher['postQuestion']
  readonly login: LoginDispatcher['login']
  readonly logout: LoginDispatcher['logout']
}

type QuestionCreateProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  fetching: state.todoState.fetching,
  id: state.loginState.id,
})

const mapDispatchToProps = {
  postQuestion,
  login,
  logout,
}

const QuestionCreate: FC<QuestionCreateProps> = (props: QuestionCreateProps) => {
  const [title, setTitle] = useState<string>()
  const [body, setBody] = useState<string>()
  const [isTitleErrorEmpty, setIsTitleErrorEmpty] = useState<boolean>(false)
  const [isBodyErrorEmpty, setIsBodyErrorEmpty] = useState<boolean>(false)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const handlePostQuestion = () => {
    if (title && body) {
      props.postQuestion(title, body)
      return
    }
    setIsTitleErrorEmpty(!title)
    setIsBodyErrorEmpty(!body)
  }

  const handleLogin = () => {
    props.history.push(paths.login)
  }
  const handleLogout = () => {
    props.history.push(paths.login)
    props.logout()
  }

  return (
    <div>
      <Header title={words.todoApp.title} userId={props.id} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div className={style.main}>
        <div>{words.questionCreate.postQuestion}</div>

        {!props.id && <div>{words.questionCreate.notLoginBody}</div>}

        {props.id && (
          <>
            <div>{words.questionCreate.title}</div>
            <br />
            {isTitleErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
            <form>
              <input
                maxLength={100}
                minLength={1}
                required
                className={`${style.titleEdit} ${style.formControl}`}
                type="text"
                onChange={handleTitleChange}
                value={title}
              />
              <br />
              <div>{words.questionCreate.body}</div>
              <br />
              {isBodyErrorEmpty && <div className={style.errorEmpty}>{words.common.textErrorEmpty}</div>}
              <textarea
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
