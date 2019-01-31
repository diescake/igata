import { EnhanceFooter } from '@/app/helpers/EnhanceFooter'
import words from '@/assets/strings'
import * as React from 'react'

namespace FooterHOC {
  export interface Props {}
  export interface State {}
}

class FooterHOC extends React.Component<FooterHOC.Props, FooterHOC.State> {
  handleBackClick = () => {
    alert(words.footer.back)
  }

  handleForwardClick = () => {
    alert(words.footer.forward)
  }

  render = () => {
    return (
      <>
        <button onClick={this.handleBackClick}>{words.footer.back}</button>
        <button onClick={this.handleForwardClick}>{words.footer.forward}</button>
      </>
    )
  }
}

export const Footer = EnhanceFooter(FooterHOC)
