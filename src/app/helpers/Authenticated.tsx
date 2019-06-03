import * as React from 'react'
import { Redirect } from 'react-router'

interface Props {
  children: React.ReactNode
}
interface State {}

export class Authenticated extends React.Component<Props, State> {
  render = () => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />
    }

    return <>{this.props.children}</>
  }
}
