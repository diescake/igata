import * as React from 'react'

export namespace SFCExample {
  export interface Props {}
  export interface State {}
}

export class SFCExample extends React.Component<SFCExample.Props, SFCExample.State> {
  render = () => <h1>Hello from TypeScript and framework!!!</h1>
}
