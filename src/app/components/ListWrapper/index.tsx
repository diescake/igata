import React, { FC } from 'react'
import style from '@/app/components/ListWrapper/style.scss'

interface Props {
  readonly children?: React.ReactNode
}

export const ListWrapper: FC<Props> = (props: Props) => {
  if (!props.children || React.Children.count(props.children) === 0) {
    return null
  }

  return <ul className={style.listWrapperUl}>{props.children}</ul>
}
