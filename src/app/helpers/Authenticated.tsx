import React from 'react'
import { Redirect } from 'react-router'

interface Props {
  readonly children?: React.ReactNode
}

export const Authenticated = (props: Props) => {
  if (!localStorage.getItem('token')) {
    return <Redirect to="/login" />
  }

  return <>{props.children}</>
}
