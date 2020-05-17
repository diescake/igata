import React, { FC } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import words from '@/assets/strings'

interface Props {
  readonly title: string
  readonly icon?: IconDefinition
  readonly userId?: string
}

export const Header: FC<Props> = (props: Props) => (
  <div>
    <Heading>
      {props.icon && <Icon icon={props.icon} />}
      {props.title}
    </Heading>
    {props.userId && <b>{words.todoApp.loginMessage(props.userId)}</b>}
  </div>
)

const Heading = styled.h1`
  font-size: 4.6rem;
`
const Icon = styled(FontAwesomeIcon)`
  margin-right: 12px;
  font-size: 4.2rem;
`
