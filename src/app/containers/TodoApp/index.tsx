import { logout, Logout } from '@/app/actions/login'
import { addTodo, AddTodo, fetchTodos, FetchTodos } from '@/app/actions/todo'
import { ListWrapper } from '@/app/components/ListWrapper'
import { RootState } from '@/app/models'
import { Todo } from '@/app/models/Todo'
import words from '@/assets/strings'
import * as React from 'react'
import { connect } from 'react-redux'
import key from 'weak-key'
import style from './style.scss'
import dayjs from 'dayjs'

interface Props {
  readonly title: string
  readonly todos: Todo[]
  readonly token: string
  readonly addTodo: AddTodo
  readonly fetchTodos: FetchTodos
  readonly logout: Logout
}

interface State {
  readonly currentText: string
}

const mapStateToProps = (state: RootState) => ({
  todos: state.todoState.todos,
  token: state.loginState.token,
})

const mapDispatchToProps = {
  addTodo,
  fetchTodos,
  logout,
}

class TodoApp extends React.Component<Props, State> {
  static defaultProps: Pick<Props, 'title'> = {
    title: 'Todo Application',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      currentText: '',
    }
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

    const currentTimeHeader = () => (
      <p>
        <b>{`${words.todoApp.dateMessage}: ${dayjs().format('YYYY-MM-DD hh:mm:ss')}`}</b>
      </p>
    )

    return (
      <div className={style.container}>
        <h1 className={style.header}>{this.props.title}</h1>
        <div>
          {currentTimeHeader()}
          {tokenHeader(this.props.token)}
          <button type="button" className={style.fetchButton} onClick={this.handleFetchTodos}>
            {words.todoApp.fetchTodos}
          </button>
          <button type="button" className={style.logoutButton} onClick={this.handleLogout}>
            {words.todoApp.logout}
          </button>
        </div>
        <div>
          <input
            className={style.inputTodo}
            type="text"
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            placeholder={words.todoApp.placeholder}
            value={this.state.currentText}
          />
          <button type="button" className={style.addButton} onClick={this.handleAddTodoClick}>
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
