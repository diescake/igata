import * as React from 'react'

export namespace Footer {
  export interface Props {}
  export interface State {}
}

export class Footer extends React.Component<Footer.Props, Footer.State> {
  handleBackClick = () => {
    alert('back')
  }

  handleForwardClick = () => {
    alert('forward')
  }

  render() {
    return (
      <div>
        <button onClick={this.handleBackClick}>Back</button>
        <button onClick={this.handleForwardClick}>Forward</button>
      </div>
    )
  }
}
