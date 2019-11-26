import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import { MemoryRouter } from 'react-router'
import { Header } from '@/app/components/Header'

storiesOf('Components|Header', module)
  .add('with login', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <Header userId={text('userId', 'test')} handleLogin={() => {}} handleLogout={() => {}} />
    </MemoryRouter>
  ))
  .add('with logout', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <Header handleLogin={() => {}} />
    </MemoryRouter>
  ))
