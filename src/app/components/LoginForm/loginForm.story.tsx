import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { createBrowserHistory } from 'history'
import { configureStore } from '@/app/store'

import { LoginForm } from '@/app/components/LoginForm'

const store = configureStore(createBrowserHistory())

const dispatch = () => {
  store.dispatch({
    type: 'LOGIN/LOGIN',
    payload: {
      email: '',
      password: '',
    },
  })
}

storiesOf('Components|LoginForm', module).add('login form', () => (
  <MemoryRouter initialEntries={['/', '']}>
    <LoginForm login={dispatch} />
  </MemoryRouter>
))
