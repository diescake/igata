import React, { FC, useEffect } from 'react'
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '@/app/components/Modal/style.scss'

interface Props {
  hidden: boolean
  icon?: IconDefinition
  name: string
  children: React.ReactNode
  onLoad?: () => void
  close: (e?: React.MouseEvent<HTMLElement>) => void
}

export const Modal: FC<Props> = (props: Props) => {
  useEffect(() => {
    if (props.onLoad) {
      props.onLoad()
    }
  }, [props.onLoad])

  return (
    <div>
      <div role="presentation" className={style.modal} hidden={props.hidden} onClick={props.close} />
      <div className={style.modalContent} hidden={props.hidden}>
        <header className={style.header}>
          <h1 className={style.title}>
            {props.icon && <FontAwesomeIcon className={style.icon} icon={props.icon} />}
            {props.name}
          </h1>
          <button type="button" className={style.close} onClick={props.close}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        {props.children}
      </div>
    </div>
  )
}
