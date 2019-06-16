import React, { useState, FC } from 'react'
import { connect } from 'react-redux'
import key from 'weak-key'

import { logout, Logout } from '@/app/actions/login'
import { addTodo, AddTodo, fetchTodos, FetchTodos } from '@/app/actions/todo'
import { ListWrapper } from '@/app/components/ListWrapper'
import { RootState } from '@/app/models'
import { Todo } from '@/app/models/Todo'
import words from '@/assets/strings'
import style from '@/app/containers/TodoApp/style.scss'
import { Header } from '@/app/components/Header'

interface StateProps {
  readonly todos: Todo[]
  readonly userId: string
}

interface DispatchProps {
  readonly addTodo: AddTodo
  readonly fetchTodos: FetchTodos
  readonly logout: Logout
}

type TodoAppProps = StateProps & DispatchProps

const mapStateToProps = (state: RootState): StateProps => ({
  todos: state.todoState.todos,
  userId: state.loginState.userId,
})

const mapDispatchToProps = {
  addTodo,
  fetchTodos,
  logout,
}

const TodoApp: FC<TodoAppProps> = (props: TodoAppProps) => {
  const [text, setText] = useState<string>('')

  const addTodo = () => {
    if (!text) {
      return
    }
    props.addTodo(text)
    setText('')
  }

  const handleFetchTodos = () => props.fetchTodos()
  const handleLogout = () => props.logout()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handleAddTodoClick = () => addTodo()

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return
    }
    addTodo()
  }

  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: update the checked state to store
    console.log(e.target.value)
  }

  return (
    <div className={style.container}>
      <Header title={words.todoApp.title} userId={props.userId} />
      <div>
        <button type="button" className={style.fetchButton} onClick={handleFetchTodos}>
          {words.todoApp.fetchTodos}
        </button>
        <button type="button" className={style.logoutButton} onClick={handleLogout}>
          {words.todoApp.logout}
        </button>
      </div>
      <div>
        <input
          className={style.inputTodo}
          type="text"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={words.todoApp.placeholder}
          value={text}
        />
        <button type="button" className={style.addButton} onClick={handleAddTodoClick}>
          {words.todoApp.addTodo}
        </button>
      </div>
      <ListWrapper>
        {props.todos.map((todo: Todo) => (
          <li className={style.list} key={key(todo)}>
            <input className={style.checkbox} type="checkbox" onChange={handleCheckBoxClick} checked={todo.done} />
            <label className={style.todoText}>{todo.text}</label>
          </li>
        ))}
      </ListWrapper>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
