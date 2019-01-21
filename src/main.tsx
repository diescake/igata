import * as React from 'react'
import * as ReactDOM from 'react-dom'

import '@/assets/css/common.scss'
import diescakePng from '@/assets/images/diescake.png'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const root = document.getElementById('root')

interface HelloProps {
  defaultValue: number
  mag: number
}

interface HelloState {
  value: number
}

export class Hello extends React.Component<HelloProps, HelloState> {
  constructor(props: HelloProps) {
    super(props)
    this.state = {
      value: props.defaultValue,
    }
  }

  static defaultProps: Pick<HelloProps, 'mag' | 'defaultValue'> = {
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

ReactDOM.render(
  <>
    <h1>Hello from TypeScript and framework!!!</h1>
    <Hello defaultValue={123} mag={2} />
    <Hello />
    <br />
    <img src={diescakePng} />
  </>,
  root
)
