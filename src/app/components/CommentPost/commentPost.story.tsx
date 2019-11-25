import React from 'react'
import { storiesOf } from '@storybook/react'
import { createBrowserHistory } from 'history'
import { text } from '@storybook/addon-knobs'
import { CommentPost } from '@/app/components/CommentPost'
import { configureStore } from '@/app/store'

const store = configureStore(createBrowserHistory())

const postCommentQuestionDispatch = () => {
  store.dispatch({
    type: 'COMMENT/POST_COMMENT_QUESTION',
    payload: {
      body: '',
      questionId: '',
    },
  })
}

const postCommentAnswerDispatch = () => {
  store.dispatch({
    type: 'COMMENT/POST_COMMENT_ANSWER',
    payload: {
      body: '',
      questionId: '',
      answerId: '',
    },
  })
}

storiesOf('Components|CommentPost', module)
  .add('logout', () => <CommentPost userId={text('userId', '')} questionId={text('questionId', 'questionId')} />)
  .add('login comment question', () => (
    <CommentPost
      userId={text('userId', 'userId')}
      questionId={text('questionId', 'questionId')}
      postCommentQuestion={postCommentQuestionDispatch}
    />
  ))
  .add('login comment answer', () => (
    <CommentPost
      userId={text('userId', 'userId')}
      questionId={text('questionId', 'questionId')}
      answerId={text('questionId', 'questionId')}
      postCommentAnswer={postCommentAnswerDispatch}
    />
  ))
