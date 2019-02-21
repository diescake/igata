import { Todo } from '@/app/models/Todo'
import { createAction } from 'redux-actions'

// action types
export enum Type {
  ADD_TODO = 'ADD_TODO',
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE',
}

// action creator interfaces
export type AddTodo = (text: string) => void
export type FetchTodos = () => void
export type fetchTodosSuccess = (todos: Todo[]) => void
export type fetchTodosFailure = (errorCode: string) => void

// action creators
export const addTodo = createAction<string>(Type.ADD_TODO)
export const fetchTodos = createAction(Type.FETCH_TODOS)
export const fetchTodosSuccess = createAction<Todo[]>(Type.FETCH_TODOS_SUCCESS)
export const fetchTodosFailure = createAction<string>(Type.FETCH_TODOS_FAILURE)
