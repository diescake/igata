import * as React from 'react'

export namespace Footer {
  export interface Props {}
  export interface State {}
}

export const EnhanceFooter = (ComposedComponent: React.ComponentType<Footer.Props>) =>
  class extends React.Component<Footer.Props, Footer.State> {
    constructor(props: Footer.Props) {
      super(props)
    }

    render = () => (
      <div>
        <ComposedComponent />
      </div>
    )
  }
