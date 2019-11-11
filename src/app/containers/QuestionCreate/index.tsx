import React, { FC } from 'react'
import { connect } from 'react-redux'

import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import words from '@/assets/strings'
import style from '@/app/components/LoginForm/style.scss'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { RootState } from '@/app/models'

interface StateProps {
  readonly userId: string
  readonly fetching: boolean
}

interface DispatchProps {}

type QuestionCreateProps = StateProps & DispatchProps

const mapStateToProps = (state: RootState): StateProps => ({
  fetching: state.todoState.fetching,
  userId: state.loginState.userId,
})

const mapDispatchToProps = {}

const QuestionCreate: FC<QuestionCreateProps> = (props: QuestionCreateProps) => {
  return (
    <div className={style.container}>
      <Header title={words.todoApp.title} userId={props.userId} icon={faListAlt} />
      <div>質問投稿する</div>
      <div>質問を投稿するにはログインしてください。</div>
      <Footer />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreate)
