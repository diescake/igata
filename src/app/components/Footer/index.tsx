import React, { FC } from 'react'
import words from '@/assets/strings'
import style from '@/app/components/Footer/style.scss'

export const Footer: FC = () => {
  const { twitter, github } = words.footer

  return (
    <div className={style.footer}>
      <a href={twitter.url}>{twitter.label}</a> | <a href={github.url}>{github.label}</a>
    </div>
  )
}
