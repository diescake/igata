import { EnhanceFooter } from '@/app/helpers/EnhanceFooter'
import * as React from 'react'

namespace FooterHOC {
  export interface Props {}
  export interface State {}
}

class FooterHOC extends React.Component<FooterHOC.Props, FooterHOC.State> {
  handleBackClick = () => {
    alert('back')
  }

  handleForwardClick = () => {
    alert('forward')
  }
  render() {
    return (
      <>
        <button onClick={this.handleBackClick}>Back</button>
        <button onClick={this.handleForwardClick}>Forward</button>
      </>
    )
  }
}

export const Footer = EnhanceFooter(FooterHOC)
