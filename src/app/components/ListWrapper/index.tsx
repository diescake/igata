import * as React from 'react'
import style from './style.scss'

interface Props {
  children?: React.ReactNode
}

export const ListWrapper = (props: Props) => {
  if (!props.children || React.Children.count(props.children) === 0) {
    return null
  }

  return <ul className={style.listWrapperUl}>{props.children}</ul>
}
