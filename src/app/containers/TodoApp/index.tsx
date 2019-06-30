import React, { FC, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import { connect } from 'react-redux'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'

import { logout, DispatchLogout } from '@/app/actions/login'
import {
  addTodo,
  DispatchAddTodo,
  updateTodo,
  DispatchUpdateTodo,
  deleteTodo,
  DispatchDeleteTodo,
  fetchTodos,
  DispatchFetchTodos,
} from '@/app/actions/todo'
import { Header } from '@/app/components/Header'
import { TodoItem } from '@/app/components/TodoItem'
import { ListWrapper } from '@/app/components/ListWrapper'
import { Modal } from '@/app/components/Modal'
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
  readonly addTodo: DispatchAddTodo
  readonly updateTodo: DispatchUpdateTodo
  readonly deleteTodo: DispatchDeleteTodo
  readonly fetchTodos: DispatchFetchTodos
  readonly logout: DispatchLogout
}

type TodoAppProps = StateProps & DispatchProps

const mapStateToProps = (state: RootState): StateProps => ({
  todos: state.todoState.todos,
  fetching: state.todoState.fetching,
  userId: state.loginState.userId,
})

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo,
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
  const handleDeleteClick = (todo: Todo) => props.deleteTodo(todo.id)

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
      <Header title={words.todoApp.title} userId={props.userId} icon={faListAlt} />

      <div>
        <button type="button" className={style.fetchButton} disabled={props.fetching} onClick={handleFetchTodos}>
          {words.todoApp.fetchTodos}
        </button>
        <button type="button" className={style.logoutButton} onClick={handleLogout}>
          {words.todoApp.logout}
        </button>
      </div>
      <button type="button" onClick={modalOpen}>
        {words.todoApp.newTodo}
      </button>
      <Modal hidden={modalHidden} name={words.todoApp.newTodo} close={modalClose}>
        <input
          className={style.inputTodo}
          type="text"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={words.todoApp.placeholder}
          value={text}
        />
        <button type="button" className={style.addButton} disabled={props.fetching} onClick={handleAddTodoClick}>
          {words.todoApp.addTodo}
        </button>
      </Modal>

      <ListWrapper loading={props.fetching}>
        {props.todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} handleCheckBoxClick={handleCheckBoxClick} handleDeleteClick={handleDeleteClick} />
        ))}
      </ListWrapper>
      <Footer />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
