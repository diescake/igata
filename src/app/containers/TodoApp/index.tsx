import { addTodo, AddTodo, fetchTodos, FetchTodos } from '@/app/actions/todo'
import { Footer } from '@/app/components/Footer'
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
    exampleValue: number
    todos: Todo[]
    addTodo: AddTodo
    fetchTodos: FetchTodos
  }
  export interface State {
    value: number
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
      value: props.exampleValue,
    }
  }

  static defaultProps: Pick<TodoApp.Props, 'exampleValue'> = {
    exampleValue: 1,
  }

  handleAddTodo = () => this.props.addTodo(`My Todo (${Math.random()})`)
  handleFetchTodos = () => this.props.fetchTodos()

  render = () => (
    <div>
      <h1>Todo Application</h1>
      <ListWrapper>
        {this.props.todos.map((todo: Todo) => (
          <li className={style.list} key={key(todo)}>
            {todo.text}
          </li>
        ))}
      </ListWrapper>
      <button onClick={this.handleFetchTodos}>{words.todoApp.fetchTodos}</button>
      <button onClick={this.handleAddTodo}>{words.todoApp.addTodo}</button>
      <Footer />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
