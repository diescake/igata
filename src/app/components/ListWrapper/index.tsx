import * as React from 'react'
import style from './style.scss'

export namespace ListWrapper {
  export interface Props {
    children: React.ReactNode
  }
  export interface State {}
}

export class ListWrapper extends React.Component<ListWrapper.Props, ListWrapper.State> {
  render = () => {
    if (!this.props.children || !React.Children.count(this.props.children)) {
      return null
    }

    return <ul className={style.listWrapperUl}>{this.props.children}</ul>
  }
}
