import * as React from 'react'
import { Redirect } from 'react-router'

export namespace Authenticated {
  export interface Props {
    children: React.ReactNode
  }
  export interface State {}
}

export class Authenticated extends React.Component<Authenticated.Props, Authenticated.State> {
  render = () => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />
    }

    return <>{this.props.children}</>
  }
}
