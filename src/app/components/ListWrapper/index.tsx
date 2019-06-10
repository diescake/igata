import * as React from 'react'
import style from '@/app/components/ListWrapper/style.scss'

interface Props {
  children: React.ReactNode
}
interface State {}

export class ListWrapper extends React.Component<Props, State> {
  render = () => {
    if (!this.props.children || !React.Children.count(this.props.children)) {
      return null
    }

    return <ul className={style.listWrapperUl}>{this.props.children}</ul>
  }
}
