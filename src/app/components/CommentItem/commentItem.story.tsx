import React from 'react'
import { storiesOf } from '@storybook/react'
import { createBrowserHistory } from 'history'
import { text } from '@storybook/addon-knobs'
import { MemoryRouter } from 'react-router'

import { CommentItem } from '@/app/components/CommentItem'
import { configureStore } from '@/app/store'

const store = configureStore(createBrowserHistory())

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

const putCommentAnswerDispatch = () => {
  store.dispatch({
    type: 'COMMENT/PUT_COMMENT_ANSWER',
    payload: {
      body: '',
      answerId: '',
      commentId: '',
      questionId: '',
    },
  })
}

storiesOf('Components|CommentItem', module)
  .add(' logout ', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <CommentItem
        comment={{
          body: text('body', 'body'),
          createdAt: text('createdAt', 'createdAt'),
          id: text('id', 'id'),
          userId: text('commentUserId', 'commentUserId'),
        }}
        userId=""
        questionId={text('questionId', 'questionId')}
      />
    </MemoryRouter>
  ))
  .add('put comment question', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <CommentItem
        comment={{
          body: text('body', 'body'),
          createdAt: text('createdAt', 'createdAt'),
          id: text('id', 'id'),
          userId: text('commentUserId', 'commentUserId'),
        }}
        userId="commentUserId"
        questionId={text('questionId', 'questionId')}
        putCommentQuestion={putCommentQuestionDispatch}
      />
    </MemoryRouter>
  ))
  .add('put comment answer', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <CommentItem
        comment={{
          body: text('body', 'body'),
          createdAt: text('createdAt', 'createdAt'),
          id: text('id', 'id'),
          userId: text('commentUserId', 'commentUserId'),
        }}
        userId="commentUserId"
        questionId={text('questionId', 'questionId')}
        answerId={text('answerId', 'answerId')}
        putCommentAnswer={putCommentAnswerDispatch}
      />
    </MemoryRouter>
  ))
  .add('userId not equal', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <CommentItem
        comment={{
          body: text('body', 'body'),
          createdAt: text('createdAt', 'createdAt'),
          id: text('id', 'id'),
          userId: text('commentUserId', 'commentUserId'),
        }}
        userId={text('userId', 'userId')}
        questionId={text('questionId', 'questionId')}
        putCommentQuestion={putCommentQuestionDispatch}
      />
    </MemoryRouter>
  ))
