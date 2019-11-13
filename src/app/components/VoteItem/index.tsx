import React, { FC } from 'react'
import style from '@/app/components/VoteItem/style.scss'

interface Props {}

export const VoteItem: FC<Props> = () => (
  <>
    <div className={style.voteArrow}>▲</div>
    <div className={style.voteCount}>0</div>
    <div className={style.voteArrow}>▼</div>
  </>
)
