import React from 'react'
import { storiesOf } from '@storybook/react'
import { createBrowserHistory } from 'history'
import { text } from '@storybook/addon-knobs'
import { AnswerPost } from '@/app/components/AnswerPost'
import { configureStore } from '@/app/store'

const store = configureStore(createBrowserHistory())

const dispatch = () => {
  store.dispatch({
    type: 'ANSWERS/POST_ANSWER',
    payload: {
      body: '',
      questionId: '',
    },
  })
}

storiesOf('Components|AnswerPost', module)
  .add('post logout', () => (
    <AnswerPost userId={text('userId', '')} questionId={text('questionId', 'questionId')} postAnswer={dispatch} />
  ))
  .add('post login', () => (
    <AnswerPost userId={text('userId', 'userId')} questionId={text('questionId', 'questionId')} postAnswer={dispatch} />
  ))
