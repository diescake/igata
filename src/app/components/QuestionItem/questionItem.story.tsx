import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { QuestionItem } from '@/app/components/QuestionItem'

storiesOf('Components|QuestionItem', module)
  .add('user id show', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <QuestionItem
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
      <QuestionItem
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
