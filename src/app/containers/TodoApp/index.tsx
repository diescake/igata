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
    addTodo: AddTodo
    fetchTodos: FetchTodos
  }
  export interface State {
    currentText: string
  }
}

const mapStateToProps = (state: RootState) => ({
  todos: state.todoState.todos,
})

const mapDispatchToProps = {
  addTodo,
  fetchTodos,
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

  render = () => (
    <div className={style.container}>
      <h1 className={style.header}>{this.props.title}</h1>
      <div>
        <button onClick={this.handleFetchTodos}>{words.todoApp.fetchTodos}</button>
      </div>
      <div>
        <input
          type="text"
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Enter your todo"
          value={this.state.currentText}
        />
        <button onClick={this.handleAddTodoClick}>{words.todoApp.addTodo}</button>
      </div>
      <ListWrapper>
        {this.props.todos.map((todo: Todo) => (
          <li className={style.list} key={key(todo)}>
            {todo.text}
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
