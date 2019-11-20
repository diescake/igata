import { Answer, Query } from '@/app/models/Answer'
import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  FETCH_ANSWERS: 'ANSWERS/FETCH_ANSWERS',
  FETCH_ANSWERS_SUCCESS: 'ANSWERS/FETCH_ANSWERS_SUCCESS',
  FETCH_ANSWERS_FAILURE: 'ANSWERS/FETCH_ANSWERS_FAILURE',
  POST_ANSWER: 'ANSWERS/POST_ANSWER',
  POST_ANSWER_SUCCESS: 'ANSWERS/POST_ANSWER_SUCCESS',
  POST_ANSWER_FAILURE: 'ANSWERS/POST_ANSWER_FAILURE',
  PUT_ANSWER: 'ANSWERS/PUT_ANSWER',
  PUT_ANSWER_SUCCESS: 'ANSWERS/PUT_ANSWER_SUCCESS',
  PUT_ANSWER_FAILURE: 'ANSWERS/PUT_ANSWER_FAILURE',
} as const

// action creators

// GET
export const fetchAnswers = (obj: Query) => ({
  type: Type.FETCH_ANSWERS,
  payload: obj,
})

export const fetchAnswersSuccess = (answers: Answer[]) => ({
  type: Type.FETCH_ANSWERS_SUCCESS,
  payload: { answers },
})

export const fetchAnswersFailure = (errorText: string) => ({
  type: Type.FETCH_ANSWERS_FAILURE,
  payload: { errorText },
})

// POST
export const postAnswer = (body: string, questionId: string) => ({
  type: Type.POST_ANSWER,
  payload: { body, questionId },
})

export const postAnswerSuccess = () => ({
  type: Type.POST_ANSWER_SUCCESS,
})

export const postAnswerFailure = () => ({
  type: Type.POST_ANSWER_FAILURE,
})

// PUT
export const putAnswer = (body: string, answerId: string, questionId: string) => ({
  type: Type.PUT_ANSWER,
  payload: { body, answerId, questionId },
})

export const putAnswerSuccess = () => ({
  type: Type.PUT_ANSWER_SUCCESS,
})

export const putAnswerFailure = () => ({
  type: Type.PUT_ANSWER_FAILURE,
})

export type AnswerAction = CreateActionTypes<Omit<typeof import('./answer'), 'Type'>>
export type AnswerDispatcher = CreateDispatcherTypes<Omit<typeof import('./answer'), 'Type'>>
