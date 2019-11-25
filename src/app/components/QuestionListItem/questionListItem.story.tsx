import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { QuestionListItem } from '@/app/components/QuestionListItem'

storiesOf('Components|QuestionListItem', module)
  .add('user id show', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <QuestionListItem
        question={{
          body: 'body',
          comments: [],
          createdAt: 'createdAt',
          dislikeVoterIds: [],
          id: 'id',
          likeVoterIds: [],
          title: 'title',
          userId: 'userId',
        }}
        isUserIdShow
      />
    </MemoryRouter>
  ))
  .add('user id hide', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <QuestionListItem
        question={{
          body: 'body',
          comments: [],
          createdAt: 'createdAt',
          dislikeVoterIds: [],
          id: 'id',
          likeVoterIds: [],
          title: 'title',
          userId: 'userId',
        }}
      />
    </MemoryRouter>
  ))
