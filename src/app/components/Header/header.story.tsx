import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react'
// eslint-disable-next-line import/no-extraneous-dependencies
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
