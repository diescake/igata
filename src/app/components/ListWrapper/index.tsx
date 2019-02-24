import * as React from 'react'

export namespace ListWrapper {
  export interface Props {
    children: React.ReactNode
  }
  export interface State {}
}

export class ListWrapper extends React.Component<ListWrapper.Props, ListWrapper.State> {
  render = () => {
    if (!this.props.children || !React.Children.count(this.props.children)) {
      return (
        <ul>
          <li>
            <p>No data</p>
          </li>
        </ul>
      )
    }

    return <ul>{this.props.children}</ul>
  }
}
