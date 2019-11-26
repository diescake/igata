import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { createBrowserHistory } from 'history'
import { text } from '@storybook/addon-knobs'
import { configureStore } from '@/app/store'
import { AnswerList } from '@/app/components/QuestionDetail/AnswerList'

const store = configureStore(createBrowserHistory())

const postAnswerDispatch = () => {
  store.dispatch({
    type: 'ANSWERS/POST_ANSWER',
    payload: {
      body: '',
      questionId: '',
    },
  })
}

const putAnswerDispatch = () => {
  store.dispatch({
    type: 'ANSWERS/PUT_ANSWER',
    payload: {
      body: '',
      answerId: '',
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

const answers = [
  {
    id: 'answerId_1',
    body: 'answerBody_1',
    questionId: 'answerQuestionId_1',
    userId: 'answerUserId_1',
    createdAt: 'answerCreatedAt_1',
    comments: [
      {
        id: 'commentId_1',
        userId: 'commentUserId_1',
        createdAt: 'commentCreatedAt_1',
        body: 'commentBody_1',
      },
      {
        id: 'commentId_2',
        userId: 'commentUserId_2',
        createdAt: 'commentCreatedAt_2',
        body: 'commentBody_2',
      },
      {
        id: 'commentId_3',
        userId: 'commentUserId_3',
        createdAt: 'commentCreatedAt_3',
        body: 'commentBody_3',
      },
      {
        id: 'commentId_4',
        userId: 'commentUserId_4',
        createdAt: 'commentCreatedAt_4',
        body: 'commentBody_4',
      },
      {
        id: 'commentId_5',
        userId: 'commentUserId_5',
        createdAt: 'commentCreatedAt_5',
        body: 'commentBody_5',
      },
    ],
  },
  {
    id: 'answerId_2',
    body: 'answerBody_2',
    questionId: 'answerQuestionId_2',
    userId: 'answerUserId_2',
    createdAt: 'answerCreatedAt_"',
    comments: [
      {
        id: 'commentId_1',
        userId: 'commentUserId_1',
        createdAt: 'commentCreatedAt_1',
        body: 'commentBody_1',
      },
    ],
  },
]

storiesOf('Components|QuestionDetail/AnswerList', module)
  .add('logout', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <AnswerList
        userId=""
        questionId=""
        answers={answers}
        postCommentAnswer={postAnswerDispatch}
        putCommentAnswer={putAnswerDispatch}
        postAnswer={postCommentAnswerDispatch}
        putAnswer={putCommentAnswerDispatch}
      />
    </MemoryRouter>
  ))
  .add('login', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <AnswerList
        userId={text('userId', 'userId')}
        questionId="questionId"
        answers={answers}
        postCommentAnswer={postAnswerDispatch}
        putCommentAnswer={putAnswerDispatch}
        postAnswer={postCommentAnswerDispatch}
        putAnswer={putCommentAnswerDispatch}
      />
    </MemoryRouter>
  ))
  .add('not answer', () => (
    <MemoryRouter initialEntries={['/', '']}>
      <AnswerList
        userId={text('userId', 'userId')}
        questionId=""
        answers={[]}
        postCommentAnswer={postAnswerDispatch}
        putCommentAnswer={putAnswerDispatch}
        postAnswer={postCommentAnswerDispatch}
        putAnswer={putCommentAnswerDispatch}
      />
    </MemoryRouter>
  ))
