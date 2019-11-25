import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { createBrowserHistory } from 'history'
// eslint-disable-next-line import/no-extraneous-dependencies
import { text } from '@storybook/addon-knobs'
import { configureStore } from '@/app/store'
import { QuestionPost } from '@/app/components/QuestionPost'

const store = configureStore(createBrowserHistory())
const dispatch = () => {
  store.dispatch({
    type: 'QUESTIONS/POST_QUESTION',
    payload: {
      title: '',
      body: '',
    },
  })
}

storiesOf('Components|QuestionPost', module)
  .add('logout ', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <QuestionPost userId="" postQuestion={dispatch} />
    </MemoryRouter>
  ))
  .add('login', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <QuestionPost userId={text('userId', 'userId')} postQuestion={dispatch} />
    </MemoryRouter>
  ))
