import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  // 質問
  POST_COMMENT_QUESTION: 'COMMENT/POST_COMMENT_QUESTION',
  POST_COMMENT_QUESTION_SUCCESS: 'COMMENT/POST_COMMENT_QUESTION_SUCCESS',
  POST_COMMENT_QUESTION_FAILURE: 'COMMENT/POST_COMMENT_QUESTION_FAILURE',
  PUT_COMMENT_QUESTION: 'COMMENT/PUT_COMMENT_QUESTION',
  PUT_COMMENT_QUESTION_SUCCESS: 'COMMENT/PUT_COMMENT_QUESTION_SUCCESS',
  PUT_COMMENT_QUESTION_FAILURE: 'COMMENT/PUT_COMMENT_QUESTION_FAILURE',

  // 回答
  POST_COMMENT_ANSWER: 'COMMENT/POST_COMMENT_ANSWER',
  POST_COMMENT_ANSWER_SUCCESS: 'COMMENT/POST_COMMENT_ANSWER_SUCCESS',
  POST_COMMENT_ANSWER_FAILURE: 'COMMENT/POST_COMMENT_ANSWER_FAILURE',
  PUT_COMMENT_ANSWER: 'COMMENT/PUT_COMMENT_ANSWER',
  PUT_COMMENT_ANSWER_SUCCESS: 'COMMENT/PUT_COMMENT_ANSWER_SUCCESS',
  PUT_COMMENT_ANSWER_FAILURE: 'COMMENT/PUT_COMMENT_ANSWER_FAILURE',
} as const

// action creators
// コメント 質問
export const postCommentQuestion = (path: string, body: string, id: string) => ({
  type: Type.POST_COMMENT_QUESTION,
  payload: { path, body, id },
})
export const postCommentQuestionSuccess = () => ({
  type: Type.POST_COMMENT_QUESTION_SUCCESS,
})
export const postCommentQuestionFailure = () => ({
  type: Type.POST_COMMENT_QUESTION_FAILURE,
})
export const putCommentQuestion = (path: string, body: string, id: string) => ({
  type: Type.PUT_COMMENT_QUESTION,
  payload: { path, body, id },
})
export const putCommentQuestionSuccess = () => ({
  type: Type.PUT_COMMENT_QUESTION_SUCCESS,
})
export const putCommentQuestionFailure = () => ({
  type: Type.PUT_COMMENT_QUESTION_FAILURE,
})

// コメント 回答
export const postCommentAnswer = (path: string, body: string, id: string) => ({
  type: Type.POST_COMMENT_ANSWER,
  payload: { path, body, id },
})
export const postCommentAnswerSuccess = () => ({
  type: Type.POST_COMMENT_ANSWER_SUCCESS,
})
export const postCommentAnswerFailure = () => ({
  type: Type.POST_COMMENT_ANSWER_FAILURE,
})
export const putCommentAnswer = (path: string, body: string, id: string) => ({
  type: Type.PUT_COMMENT_ANSWER,
  payload: { path, body, id },
})
export const putCommentAnswerSuccess = () => ({
  type: Type.PUT_COMMENT_ANSWER_SUCCESS,
})
export const putCommentAnswerFailure = () => ({
  type: Type.PUT_COMMENT_ANSWER_FAILURE,
})

export type CommentAction = CreateActionTypes<Omit<typeof import('./comment'), 'Type'>>
export type CommentDispatcher = CreateDispatcherTypes<Omit<typeof import('./comment'), 'Type'>>
