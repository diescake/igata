import { login, Login, logout, Logout } from '@/app/actions/login'
import { addTodo, AddTodo, fetchTodos, FetchTodos } from '@/app/actions/todo'
import { ListWrapper } from '@/app/components/ListWrapper'
import { RootState } from '@/app/models'
import { Todo } from '@/app/models/Todo'
import words from '@/assets/strings'
import * as React from 'react'
import { connect } from 'react-redux'
import * as key from 'weak-key'
import style from './style.scss'

namespace TodoApp {
  export interface Props {
    title: string
    todos: Todo[]
    token: string
    addTodo: AddTodo
    fetchTodos: FetchTodos
    login: Login
    logout: Logout
  }
  export interface State {
    currentText: string
  }
}

const mapStateToProps = (state: RootState) => ({
  todos: state.todoState.todos,
  token: state.loginState.token,
})

const mapDispatchToProps = {
  addTodo,
  fetchTodos,
  login,
  logout,
}

class TodoApp extends React.Component<TodoApp.Props, TodoApp.State> {
  constructor(props: TodoApp.Props) {
    super(props)
    this.state = {
      currentText: '',
    }
  }

  static defaultProps: Pick<TodoApp.Props, 'title'> = {
    title: 'Todo Application',
  }

  addTodo = () => {
    if (!this.state.currentText) {
      return
    }
    this.props.addTodo(this.state.currentText)
    this.setState({
      currentText: '',
    })
  }

  handleFetchTodos = () => this.props.fetchTodos()
  handleLogin = () => this.props.login('example_id', 'example_password')
  handleLogout = () => this.props.logout()

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      currentText: e.target.value,
    })

  handleAddTodoClick = () => this.addTodo()

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return
    }
    this.addTodo()
  }

  handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: update the checked state to store
    console.log(e.target.value)
  }

  render = () => {
    const tokenHeader = (token: string) => (
      <p>
        {token && (
          <>
            <b>{`${words.todoApp.loginMessage}: `}</b>
            {token}
          </>
        )}
      </p>
    )

    return (
      <div className={style.container}>
        <h1 className={style.header}>{this.props.title}</h1>
        <div>
          {tokenHeader(this.props.token)}
          <button className={style.fetchButton} onClick={this.handleFetchTodos}>
            {words.todoApp.fetchTodos}
          </button>
          <button className={style.loginButton} onClick={this.handleLogin}>
            {words.todoApp.login}
          </button>
          <button className={style.logoutButton} onClick={this.handleLogout}>
            {words.todoApp.logout}
          </button>
        </div>
        <div>
          <input
            className={style.inputTodo}
            type="text"
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Enter your todo"
            value={this.state.currentText}
          />
          <button className={style.addButton} onClick={this.handleAddTodoClick}>
            {words.todoApp.addTodo}
          </button>
        </div>
        <ListWrapper>
          {this.props.todos.map((todo: Todo) => (
            <li className={style.list} key={key(todo)}>
              <input className={style.checkbox} type="checkbox" onChange={this.handleCheckBoxClick} checked={todo.done} />
              <label className={style.todoText}>{todo.text}</label>
            </li>
          ))}
        </ListWrapper>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
