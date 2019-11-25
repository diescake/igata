import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { createBrowserHistory } from 'history'
// eslint-disable-next-line import/no-extraneous-dependencies
import { text } from '@storybook/addon-knobs'
import { configureStore } from '@/app/store'
import { Question } from '@/app/components/QuestionDetail/Question'

const store = configureStore(createBrowserHistory())

const putQuestionDispatch = () => {
  store.dispatch({
    type: 'COMMENT/POST_COMMENT_QUESTION',
    payload: {
      body: '',
      questionId: '',
    },
  })
}

const postCommentQuestionDispatch = () => {
  store.dispatch({
    type: 'COMMENT/POST_COMMENT_QUESTION',
    payload: {
      body: '',
      questionId: '',
    },
  })
}

const putCommentQuestionDispatch = () => {
  store.dispatch({
    type: 'COMMENT/PUT_COMMENT_QUESTION',
    payload: {
      body: '',
      questionId: '',
      commentId: '',
    },
  })
}
const postVoteDispatch = () => {
  store.dispatch({
    type: 'VOTES/POST_VOTE',
    payload: {
      questionId: '',
      voteType: '',
    },
  })
}

storiesOf('Components|QuestionDetail/Question', module)
  .add('logout', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <Question
        userId=""
        questionId=""
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
        putQuestion={putQuestionDispatch}
        postCommentQuestion={postCommentQuestionDispatch}
        putCommentQuestion={putCommentQuestionDispatch}
        postVote={postVoteDispatch}
      />
    </MemoryRouter>
  ))
  .add('login', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <Question
        userId={text('userId', 'userId')}
        questionId=""
        question={{
          body: 'body',
          comments: [],
          createdAt: 'createdAt',
          dislikeVoterIds: [],
          id: 'id',
          likeVoterIds: [],
          title: 'title',
          userId: text('questionUserId', 'questionUserId'),
        }}
        putQuestion={putQuestionDispatch}
        postCommentQuestion={postCommentQuestionDispatch}
        putCommentQuestion={putCommentQuestionDispatch}
        postVote={postVoteDispatch}
      />
    </MemoryRouter>
  ))
