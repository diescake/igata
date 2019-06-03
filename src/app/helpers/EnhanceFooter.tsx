import * as React from 'react'

export namespace Footer {
  export interface Props {}
  export interface State {}
}

export const EnhanceFooter = (ComposedComponent: React.ComponentType<Footer.Props>) =>
  class extends React.Component<Footer.Props, Footer.State> {
    render = () => (
      <div>
        <ComposedComponent />
      </div>
    )
  }
