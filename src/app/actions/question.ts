import { Question } from '@/app/models/Question'
import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  ADD_QUESTION: 'QUESTIONS/ADD_QUESTION',
  UPDATE_QUESTION: 'QUESTIONS/UPDATE_QUESTION',
  DELETE_QUESTION: 'QUESTIONS/DELETE_QUESTION',
  FETCH_QUESTIONS: 'QUESTIONS/FETCH_QUESTIONS',
  FETCH_QUESTIONS_SUCCESS: 'QUESTIONS/FETCH_QUESTIONS_SUCCESS',
  FETCH_QUESTIONS_FAILURE: 'QUESTIONS/FETCH_QUESTIONS_FAILURE',
} as const

// action creators
export const addQuestion = (text: string) => ({
  type: Type.ADD_QUESTION,
  payload: { text },
})

export const updateQuestion = (question: Question) => ({
  type: Type.UPDATE_QUESTION,
  payload: { ...question },
})

export const deleteQuestion = (questionId: string) => ({
  type: Type.DELETE_QUESTION,
  payload: questionId,
})

export const fetchQuestions = () => ({
  type: Type.FETCH_QUESTIONS,
})

export const fetchQuestionsSuccess = (questions: Question[]) => ({
  type: Type.FETCH_QUESTIONS_SUCCESS,
  payload: { questions },
})

export const fetchQuestionsFailure = (errorText: string) => ({
  type: Type.FETCH_QUESTIONS_FAILURE,
  payload: { errorText },
})

export type QuestionAction = CreateActionTypes<Omit<typeof import('./question'), 'Type'>>
export type QuestionDispatcher = CreateDispatcherTypes<Omit<typeof import('./question'), 'Type'>>
