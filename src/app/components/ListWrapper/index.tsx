import React, { FC } from 'react'
import style from '@/app/components/ListWrapper/style.scss'
import { Loading } from '@/app/components/Loading'

interface Props {
  readonly loading: boolean
  readonly children?: React.ReactNode
}

export const ListWrapper: FC<Props> = (props: Props) => {
  if (props.loading) {
    return (
      <div className={style.loading}>
        <Loading visible={!props.loading} />
      </div>
    )
  }

  return <ul className={style.listWrapperUl}>{props.children}</ul>
}
