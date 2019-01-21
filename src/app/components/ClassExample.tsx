import * as React from 'react'

export namespace ClassExample {
  export interface Props {
    defaultValue: number
    mag: number
  }
  export interface State {
    value: number
  }
}

export class ClassExample extends React.Component<ClassExample.Props, ClassExample.State> {
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
  }

  multiply = (mag: number) => this.state.value * mag

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Multiply</button>
        <span>{this.state.value}</span>
      </div>
    )
  }
}
