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
  FETCH_QUESTION: 'QUESTIONS/FETCH_QUESTION',
  FETCH_QUESTION_SUCCESS: 'QUESTIONS/FETCH_QUESTION_SUCCESS',
  FETCH_QUESTION_FAILURE: 'QUESTIONS/FETCH_QUESTION_FAILURE',

  POST_QUESTION: 'QUESTIONS/POST_QUESTION',
  POST_QUESTION_SUCCESS: 'QUESTIONS/POST_QUESTION_SUCCESS',
  POST_QUESTION_FAILURE: 'QUESTIONS/POST_QUESTION_FAILURE',
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

// 単体 GET
export const fetchQuestion = (id: string) => ({
  type: Type.FETCH_QUESTION,
  payload: id,
})

export const fetchQuestionSuccess = (questions: Question) => ({
  type: Type.FETCH_QUESTION_SUCCESS,
  payload: { questions },
})

export const fetchQuestionFailure = (errorText: string) => ({
  type: Type.FETCH_QUESTION_FAILURE,
  payload: { errorText },
})

// 複数 GET
export const fetchQuestions = (id?: string) => ({
  type: Type.FETCH_QUESTIONS,
  payload: id,
})

export const fetchQuestionsSuccess = (questions: Question[]) => ({
  type: Type.FETCH_QUESTIONS_SUCCESS,
  payload: { questions },
})

export const fetchQuestionsFailure = (errorText: string) => ({
  type: Type.FETCH_QUESTIONS_FAILURE,
  payload: { errorText },
})

// POST
export const postQuestion = (title: string, body: string) => ({
  type: Type.POST_QUESTION,
  payload: { title, body },
})

export const postQuestionSuccess = () => ({
  type: Type.POST_QUESTION_SUCCESS,
})

export const postQuestionFailure = () => ({
  type: Type.POST_QUESTION_FAILURE,
})

export type QuestionAction = CreateActionTypes<Omit<typeof import('./question'), 'Type'>>
export type QuestionDispatcher = CreateDispatcherTypes<Omit<typeof import('./question'), 'Type'>>
