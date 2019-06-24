import React from 'react'
import spinner from '@/app/components/Loading/spinner.scss'

interface Props {
  visible: boolean
  type?: string
}

export const Loading = (props: Props) => {
  if (props.visible) {
    return null
  }

  return (
    <div className={spinner.halfCircleSpinner}>
      <div className={`${spinner.circle} ${spinner.circle1}`} />
      <div className={`${spinner.circle} ${spinner.circle2}`} />
    </div>
  )
}
