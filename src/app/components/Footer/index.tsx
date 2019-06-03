import { EnhanceFooter } from '@/app/helpers/EnhanceFooter'
import words from '@/assets/strings'
import * as React from 'react'

interface Props {}
interface State {}

class FooterHOC extends React.Component<Props, State> {
  handleBackClick = () => {
    // eslint-disable-next-line
    alert(words.footer.back)
  }

  handleForwardClick = () => {
    // eslint-disable-next-line
    alert(words.footer.forward)
  }

  render = () => (
    <>
      <button type="button" onClick={this.handleBackClick}>
        {words.footer.back}
      </button>
      <button type="button" onClick={this.handleForwardClick}>
        {words.footer.forward}
      </button>
    </>
  )
}

export const Footer = EnhanceFooter(FooterHOC)
