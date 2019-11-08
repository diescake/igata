import { Todo } from '@/app/models/Todo'
import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  ADD_TODO: 'TODOS/ADD_TODO',
  UPDATE_TODO: 'TODOS/UPDATE_TODO',
  DELETE_TODO: 'TODOS/DELETE_TODO',
  DETAIL_TODO: 'TODOS/DETAIL_TODO',
  FETCH_TODOS: 'TODOS/FETCH_TODOS',
  FETCH_TODOS_SUCCESS: 'TODOS/FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE: 'TODOS/FETCH_TODOS_FAILURE',
} as const

// action creators
export const addTodo = (text: string, detailText: string) => ({
  type: Type.ADD_TODO,
  payload: { text, detailText },
})

export const updateTodo = (todo: Todo) => ({
  type: Type.UPDATE_TODO,
  payload: { ...todo },
})

export const deleteTodo = (todoId: string) => ({
  type: Type.DELETE_TODO,
  payload: todoId,
})

export const detailTodo = (todoId: string) => ({
  type: Type.DETAIL_TODO,
  payload: todoId,
})

export const fetchTodos = () => ({
  type: Type.FETCH_TODOS,
})

export const fetchTodosSuccess = (todos: Todo[]) => ({
  type: Type.FETCH_TODOS_SUCCESS,
  payload: { todos },
})

export const fetchTodosFailure = (errorText: string) => ({
  type: Type.FETCH_TODOS_FAILURE,
  payload: { errorText },
})

export type TodoAction = CreateActionTypes<Omit<typeof import('./todo'), 'Type'>>
export type TodoDispatcher = CreateDispatcherTypes<Omit<typeof import('./todo'), 'Type'>>
