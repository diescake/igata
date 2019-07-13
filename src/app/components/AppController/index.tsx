import React, { ReactNode, FC, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

interface Props {
  children: ReactNode
}
type AppControllerProps = Props & RouteComponentProps

const AppController: FC<AppControllerProps> = (props: AppControllerProps) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [props.location.pathname])

  return <>{props.children}</>
}

export default withRouter(AppController)
