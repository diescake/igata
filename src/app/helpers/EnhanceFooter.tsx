import React, { FC, ComponentType } from 'react'

export interface EnhanceFooterProps {
  readonly copyright?: string
}

export const EnhanceFooter = (ComposedComponent: ComponentType<EnhanceFooterProps>): FC<EnhanceFooterProps> => (
  props: EnhanceFooterProps
) => {
  if (!props.copyright) {
    return null
  }

  return (
    <div>
      <hr />
      <ComposedComponent copyright={props.copyright} />
    </div>
  )
}
