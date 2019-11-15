import React, { ReactNode } from 'react'
import { Redirect } from 'react-router'
import { paths } from '@/app/common/paths'

interface Props {
  readonly children?: ReactNode
}

export const Authenticated = (props: Props) => {
  if (!localStorage.getItem('key')) {
    return <Redirect to={paths.login} />
  }

  return <>{props.children}</>
}
