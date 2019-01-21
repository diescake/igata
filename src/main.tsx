import * as React from 'react'
import * as ReactDOM from 'react-dom'

import '@/assets/css/common.scss'
import diescakePng from '@/assets/images/diescake.png'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const root = document.getElementById('root')

const DUMMY_NUM = 123
const DUMMY_MULTI = 2

interface HelloProps {
  compiler: string
  framework: string
}

export class Hello extends React.Component<HelloProps, {}> {
  multiply = (num: number, mag: number) => num * mag

  render() {
    return (
      <div>
        <h1>
          Hello from {this.props.compiler} and {this.props.framework}!
        </h1>
        <img src={diescakePng} />
        <span>{this.multiply(DUMMY_NUM, DUMMY_MULTI)}</span>
      </div>
    )
  }
}

ReactDOM.render(<Hello compiler="TypeScript" framework="React" />, root)
