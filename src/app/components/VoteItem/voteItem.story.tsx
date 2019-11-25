import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { createBrowserHistory } from 'history'
import { text } from '@storybook/addon-knobs'
import { configureStore } from '@/app/store'
import { VoteItem } from '@/app/components/VoteItem'

const store = configureStore(createBrowserHistory())
const dispatch = () => {
  store.dispatch({
    type: 'VOTES/POST_VOTE',
    payload: {
      questionId: '',
      voteType: '',
    },
  })
}

storiesOf('Components|VoteItem', module)
  .add('logout ', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <VoteItem
        userId=""
        questionId={text('questionId', 'questionId')}
        likeVoterIds={[]}
        dislikeVoterIds={[]}
        postVote={dispatch}
      />
    </MemoryRouter>
  ))
  .add('login', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <VoteItem
        userId={text('userId', 'userId')}
        questionId={text('questionId', 'questionId')}
        likeVoterIds={[]}
        dislikeVoterIds={[]}
        postVote={dispatch}
      />
    </MemoryRouter>
  ))
  .add('login likeVoterIds equal', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <VoteItem
        userId={text('userId', 'userId')}
        questionId={text('questionId', 'questionId')}
        likeVoterIds={['userId']}
        dislikeVoterIds={[]}
        postVote={dispatch}
      />
    </MemoryRouter>
  ))
  .add('login dislikeVoterIds equal', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <VoteItem
        userId={text('userId', 'userId')}
        questionId={text('questionId', 'questionId')}
        likeVoterIds={[]}
        dislikeVoterIds={['userId']}
        postVote={dispatch}
      />
    </MemoryRouter>
  ))
