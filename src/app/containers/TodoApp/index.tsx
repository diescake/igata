import React, { FC, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import { connect } from 'react-redux'

import { logout, Logout } from '@/app/actions/login'
import { addTodo, AddTodo, updateTodo, UpdateTodo, fetchTodos, FetchTodos } from '@/app/actions/todo'
import { ListWrapper } from '@/app/components/ListWrapper'
import { RootState } from '@/app/models'
import { Todo } from '@/app/models/Todo'
import words from '@/assets/strings'
import style from '@/app/containers/TodoApp/style.scss'
import { Header } from '@/app/components/Header'
import { Modal } from '@/app/components/Modal'

interface StateProps {
  readonly todos: Todo[]
  readonly userId: string
}

interface DispatchProps {
  readonly addTodo: AddTodo
  readonly updateTodo: UpdateTodo
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
  updateTodo,
  fetchTodos,
  logout,
}

const TodoApp: FC<TodoAppProps> = (props: TodoAppProps) => {
  const [text, setText] = useState<string>('')
  const [modalHidden, setModalHidden] = useState<boolean>(true)

  useEffect(() => {
    props.fetchTodos()
  }, [])

  const addTodo = () => {
    if (!text) {
      return
    }
    props.addTodo(text)
    setText('')
    setModalHidden(true)
  }

  const handleFetchTodos = () => props.fetchTodos()
  const handleLogout = () => props.logout()
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handleAddTodoClick = () => addTodo()

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleCheckBoxClick = (todo: Todo) => props.updateTodo({ ...todo, done: !todo.done })

  const modalOpen = () => {
    setText('')
    setModalHidden(false)
  }

  const modalClose = () => {
    setText('')
    setModalHidden(true)
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
      <button type="button" onClick={modalOpen}>
        add Todo
      </button>
      <Modal hidden={modalHidden} name="add todo" close={modalClose}>
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
      </Modal>

      <ListWrapper>
        {props.todos.map((todo: Todo) => (
          <li className={style.list} key={todo.id}>
            <input
              id={todo.id}
              className={style.checkbox}
              type="checkbox"
              onChange={handleCheckBoxClick.bind(null, todo)}
              checked={todo.done}
            />
            <label className={style.todoText} htmlFor={todo.id}>
              {todo.text}
            </label>
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
