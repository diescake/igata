import { addTodo, AddTodo } from '@/app/actions/todo'
import { Footer } from '@/app/components/Footer'
import { ListWrapper } from '@/app/components/ListWrapper'
import { RootState, TodoState } from '@/app/models/Todo'
import * as React from 'react'
import { connect } from 'react-redux'

namespace ClassExample {
  export interface Props {
    defaultValue: number
    mag: number
    todo: TodoState
    addTodo: AddTodo
  }
  export interface State {
    value: number
  }
}

const mapStateToProps = (state: RootState) => ({
  todo: state.todo,
})

const mapDispatchToProps = {
  addTodo,
}

class ClassExample extends React.Component<ClassExample.Props, ClassExample.State> {
  constructor(props: ClassExample.Props) {
    super(props)
    this.state = {
      value: props.defaultValue,
    }
  }

  static defaultProps: Pick<ClassExample.Props, 'mag' | 'defaultValue'> = {
    mag: 10,
    defaultValue: 1,
  }

  handleClick = () => {
    this.setState({
      value: this.state.value * this.props.mag,
    })
    this.props.addTodo('hoge') // FIXME: bug
  }

  handleBackClick = () => {
    alert('back')
  }

  handleForwardClick = () => {
    alert('forward')
  }

  multiply = (mag: number) => this.state.value * mag

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Multiply</button>
        <ListWrapper>
          {this.props.todo.texts.map((text: string) => (
            <li key={text}>{text}</li>
          ))}
        </ListWrapper>
        <span>{this.state.value}</span>
        <Footer />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassExample)
