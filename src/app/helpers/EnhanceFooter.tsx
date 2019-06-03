import * as React from 'react'

interface Props {}
interface State {}

export const EnhanceFooter = (ComposedComponent: React.ComponentType<Props>) =>
  class extends React.Component<Props, State> {
    render = () => (
      <div>
        <ComposedComponent />
      </div>
    )
  }
