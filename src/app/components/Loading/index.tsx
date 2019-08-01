import React from 'react'
import clsx from 'clsx'
import style from '@/app/components/Loading/style.scss'

interface Props {
  visible: boolean
  type?: string
}

export const Loading = (props: Props) => {
  if (props.visible) {
    return null
  }

  return (
    <div className={style.halfCircleSpinner}>
      <div className={clsx(style.circle, style.circle1)} />
      <div className={clsx(style.circle, style.circle2)} />
    </div>
  )
}
