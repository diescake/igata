import React, { FC } from 'react'
import styled from 'styled-components'

import words from '@/assets/strings'

export const Footer: FC = () => {
  const { twitter, github } = words.footer

  return (
    <Main>
      <a href={twitter.url}>{twitter.label}</a> | <a href={github.url}>{github.label}</a>
    </Main>
  )
}

const Main = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 23px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
`
