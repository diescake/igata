import { Question } from '@/app/models/Question'
import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  // 複数 GET
  FETCH_QUESTIONS: 'QUESTIONS/FETCH_QUESTIONS',
  FETCH_QUESTIONS_SUCCESS: 'QUESTIONS/FETCH_QUESTIONS_SUCCESS',
  FETCH_QUESTIONS_FAILURE: 'QUESTIONS/FETCH_QUESTIONS_FAILURE',
  // 単体 GET
  FETCH_QUESTION: 'QUESTIONS/FETCH_QUESTION',
  FETCH_QUESTION_SUCCESS: 'QUESTIONS/FETCH_QUESTION_SUCCESS',
  FETCH_QUESTION_FAILURE: 'QUESTIONS/FETCH_QUESTION_FAILURE',
  // POST
  POST_QUESTION: 'QUESTIONS/POST_QUESTION',
  POST_QUESTION_SUCCESS: 'QUESTIONS/POST_QUESTION_SUCCESS',
  POST_QUESTION_FAILURE: 'QUESTIONS/POST_QUESTION_FAILURE',
  // PUT
  PUT_QUESTION: 'QUESTIONS/PUT_QUESTION',
  PUT_QUESTION_SUCCESS: 'QUESTIONS/PUT_QUESTION_SUCCESS',
  PUT_QUESTION_FAILURE: 'QUESTIONS/PUT_QUESTION_FAILURE',
} as const

// action creators
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

// 単体 GET
export const fetchQuestion = (id: string) => ({
  type: Type.FETCH_QUESTION,
  payload: id,
})

export const fetchQuestionSuccess = (question: Question) => ({
  type: Type.FETCH_QUESTION_SUCCESS,
  payload: { question },
})

export const fetchQuestionFailure = (errorText: string) => ({
  type: Type.FETCH_QUESTION_FAILURE,
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

export const postQuestionFailure = (errorText: string) => ({
  type: Type.POST_QUESTION_FAILURE,
  payload: { errorText },
})

// PUT
export const putQuestion = (title: string, body: string, id: string) => ({
  type: Type.PUT_QUESTION,
  payload: { title, body, id },
})

export const putQuestionSuccess = (question: Question) => ({
  type: Type.PUT_QUESTION_SUCCESS,
  payload: { question },
})

export const putQuestionFailure = (errorText: string) => ({
  type: Type.PUT_QUESTION_FAILURE,
  payload: { errorText },
})

export type QuestionAction = CreateActionTypes<Omit<typeof import('./question'), 'Type'>>
export type QuestionDispatcher = CreateDispatcherTypes<Omit<typeof import('./question'), 'Type'>>
