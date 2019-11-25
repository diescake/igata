import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { createBrowserHistory } from 'history'
import { configureStore } from '@/app/store'
import { QuestionPager } from '@/app/components/QuestionPager'

const store = configureStore(createBrowserHistory())
const dispatch = () => {
  store.dispatch({
    type: 'QUESTIONS/FETCH_QUESTIONS',
    payload: {},
  })
}
const questionList = [
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
  {
    body: 'body',
    comments: [],
    createdAt: 'createdAt',
    dislikeVoterIds: [],
    id: 'id',
    likeVoterIds: [],
    title: 'title',
    userId: 'userId',
  },
]

storiesOf('Components|QuestionPager', module)
  .add('not pager ', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <QuestionPager questions={[]} fetchQuestions={dispatch} />
    </MemoryRouter>
  ))
  .add('pager', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <QuestionPager questions={questionList} fetchQuestions={dispatch} />
    </MemoryRouter>
  ))
