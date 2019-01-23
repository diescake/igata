import * as React from 'react'
import { Link } from 'react-router-dom'

export namespace Footer {
  export interface Props {}
  export interface State {}
}

export const EnhanceFooter = (ComposedComponent: React.ComponentType<Footer.Props>) =>
  class extends React.Component<Footer.Props, Footer.State> {
    constructor(props: Footer.Props) {
      super(props)
    }

    render = () => (
      <div>
        <ComposedComponent />
        <Link to="/">TOP</Link> | <Link to="/sfc">sfc</Link>
      </div>
    )
  }
