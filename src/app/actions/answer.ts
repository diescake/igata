import { Answer } from '@/app/models/Answer'
import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  ADD_ANSWER: 'ANSWERS/ADD_ANSWER',
  UPDATE_ANSWER: 'ANSWERS/UPDATE_ANSWER',
  DELETE_ANSWER: 'ANSWERS/DELETE_ANSWER',
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
export const addAnswer = (text: string) => ({
  type: Type.ADD_ANSWER,
  payload: { text },
})

export const updateAnswer = (answer: Answer) => ({
  type: Type.UPDATE_ANSWER,
  payload: { ...answer },
})

export const deleteAnswer = (answerId: string) => ({
  type: Type.DELETE_ANSWER,
  payload: answerId,
})

// GET
export const fetchAnswers = (id?: string) => ({
  type: Type.FETCH_ANSWERS,
  payload: id,
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
export const putAnswer = (body: string, questionId: string) => ({
  type: Type.PUT_ANSWER,
  payload: { body, questionId },
})

export const putAnswerSuccess = () => ({
  type: Type.PUT_ANSWER_SUCCESS,
})

export const putAnswerFailure = () => ({
  type: Type.PUT_ANSWER_FAILURE,
})

export type AnswerAction = CreateActionTypes<Omit<typeof import('./answer'), 'Type'>>
export type AnswerDispatcher = CreateDispatcherTypes<Omit<typeof import('./answer'), 'Type'>>
