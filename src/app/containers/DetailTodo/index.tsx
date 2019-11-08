import React, { FC, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'

import { fetchTodos, TodoDispatcher } from '@/app/actions/todo'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

import { RootState } from '@/app/models'
import { Todo } from '@/app/models/Todo'
import words from '@/assets/strings'
import style from '@/app/containers/TodoApp/style.scss'

interface StateProps {
  readonly todos: Todo[]
  readonly userId: string
  readonly fetching: boolean
}

interface DispatchProps {
  readonly fetchTodos: TodoDispatcher['fetchTodos']
}

type DetailTodoAppProps = StateProps & DispatchProps & RouteComponentProps<{ id: string }>

const mapStateToProps = (state: RootState): StateProps => ({
  todos: state.todoState.todos,
  fetching: state.todoState.fetching,
  userId: state.loginState.userId,
})

const mapDispatchToProps = {
  fetchTodos,
}

const defaultTodo = {
  id: '',
  done: false,
  text: '',
  detailText: '',
}

const DetailTodo: FC<DetailTodoAppProps> = (props: DetailTodoAppProps) => {
  useEffect(() => {
    props.fetchTodos()
  }, [])

  const todoId = props.match.params.id
  const todo = props.todos.find(todo => todo.id === todoId) || defaultTodo

  return (
    <div className={style.container}>
      <Header title={words.todoApp.title} userId={props.userId} icon={faListAlt} />

      <div>
        <h1>{todo ? todo.text : ''} </h1>
        <h2>{todo ? todo.detailText : ''}</h2>
      </div>

      <button type="button" className={style.backButton} onClick={() => props.history.goBack()}>
        {words.todoApp.detailBack}
      </button>

      <Footer />
    </div>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailTodo)
)
