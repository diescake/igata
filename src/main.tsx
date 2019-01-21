import * as React from 'react'
import * as ReactDOM from 'react-dom'

import '@/assets/css/common.scss'
import diescakePng from '@/assets/images/diescake.png'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const root = document.getElementById('root')

const DUMMY_NUM_1 = 123
const DUMMY_NUM_2 = 35
const DUMMY_MAG = 2

interface HelloProps {
  compiler: string
  framework: string
  defaultValue: number
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

  handleClick = () => {
    this.setState({
      value: this.state.value * DUMMY_MAG,
    })
    console.log(this.props.defaultValue)
  }

  multiply = (mag: number) => this.state.value * mag

  render() {
    return (
      <>
        <h1>
          Hello from {this.props.compiler} and {this.props.framework}!
        </h1>
        <div>{this.multiply(DUMMY_MAG)}</div>
        <button onClick={this.handleClick}>Click Me</button>
      </>
    )
  }
}

ReactDOM.render(
  <>
    <Hello compiler="TypeScript" framework="React" defaultValue={DUMMY_NUM_1} />
    <Hello compiler="TypeScript" framework="React" defaultValue={DUMMY_NUM_2} />
    <img src={diescakePng} />
  </>,
  root
)
