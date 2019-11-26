import React from 'react'
import { storiesOf } from '@storybook/react'
import { createBrowserHistory } from 'history'
import { text } from '@storybook/addon-knobs'
import { MemoryRouter } from 'react-router'
import { AnswerItem } from '@/app/components/AnswerItem'
import { configureStore } from '@/app/store'

const store = configureStore(createBrowserHistory())

const dispatch = () => {
  store.dispatch({
    type: 'ANSWERS/PUT_ANSWER',
    payload: {
      body: '',
      answerId: '',
      questionId: '',
    },
  })
}

storiesOf('Components|AnswerItem', module)
  .add('user detail ', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <AnswerItem
        answer={{
          id: text('id', 'id'),
          body: text('body', 'body'),
          questionId: text('answerQuestionId', 'questionId'),
          userId: text('answerUserId', 'userId'),
          createdAt: text('createdAt', 'createdAt'),
          comments: [],
        }}
        isUserDetail
      />
    </MemoryRouter>
  ))
  .add('question detail logout ', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <AnswerItem
        answer={{
          id: text('id', 'id'),
          body: text('body', 'body'),
          questionId: text('answerQuestionId', 'questionId'),
          userId: text('answerUserId', 'userId'),
          createdAt: text('createdAt', 'createdAt'),
          comments: [],
        }}
        isQuestionDetail
        putAnswer={dispatch}
      />
    </MemoryRouter>
  ))
  .add('question detail userId equal', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <AnswerItem
        answer={{
          id: text('id', 'id'),
          body: text('body', 'body'),
          questionId: text('answerQuestionId', 'questionId'),
          userId: text('answerUserId', 'userId'),
          createdAt: text('createdAt', 'createdAt'),
          comments: [],
        }}
        questionId={text('createdAt', 'createdAt')}
        isQuestionDetail
        putAnswer={dispatch}
        userId={text('userId', 'userId')}
      />
    </MemoryRouter>
  ))
  .add('question detail userId not equal', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <AnswerItem
        answer={{
          id: text('id', 'id'),
          body: text('body', 'body'),
          questionId: text('answerQuestionId', 'questionId'),
          userId: text('answerUserId', 'answerUserId'),
          createdAt: text('createdAt', 'createdAt'),
          comments: [],
        }}
        questionId={text('questionId', 'questionId')}
        isQuestionDetail
        putAnswer={dispatch}
        userId={text('userId', 'userId')}
      />
    </MemoryRouter>
  ))
