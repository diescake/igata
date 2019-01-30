import { Todo } from '@/app/models/Todo'

// action types
export const ADD_TODO = 'ADD_TODO'

export const FETCH_TODOS = 'FETCH_TODOS'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE'

// action creators
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  text,
})

export const fetchTodos = () => ({
  type: FETCH_TODOS,
})

export const fetchTodosSuccess = (todos: Todo[]) => ({
  type: FETCH_TODOS_SUCCESS,
  todos,
})

export const fetchTodosFailure = (errorCode: string) => ({
  type: FETCH_TODOS_FAILURE,
  errorCode,
})

// interface
export type AddTodo = (text: string) => void
export type FetchTodos = () => void
export type fetchTodosSuccess = (todos: Todo[]) => void
export type fetchTodosFailure = (errorCode: string) => void
