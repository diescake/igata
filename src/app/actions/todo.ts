import { TodoState, Todo } from '@/app/models/Todo'

// action types
export const Type = {
  ADD_TODO: 'TODOS/ADD_TODO',
  UPDATE_TODO: 'TODOS/UPDATE_TODO',
  DELETE_TODO: 'TODOS/DELETE_TODO',
  FETCH_TODOS: 'TODOS/FETCH_TODOS',
  FETCH_TODOS_SUCCESS: 'TODOS/FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE: 'TODOS/FETCH_TODOS_FAILURE',
} as const

// bound action creator interfaces
export type DispatchAddTodo = (text: string) => void
export type DispatchUpdateTodo = (todo: Todo) => void
export type DispatchDeleteTodo = (todoId: string) => void
export type DispatchFetchTodos = () => void
export type DispatchFetchTodosSuccess = (todoState: TodoState) => void
export type DispatchFetchTodosFailure = (errorCode: string) => void

// action creators
export const addTodo = (text: string) => ({
  type: Type.ADD_TODO,
  payload: { text },
})

export const updateTodo = (todo: Todo) => ({
  type: Type.UPDATE_TODO,
  payload: { ...todo },
})

export const deleteTodo = (todoId: string) => ({
  type: Type.DELETE_TODO,
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

export type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof updateTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof fetchTodos>
  | ReturnType<typeof fetchTodosSuccess>
  | ReturnType<typeof fetchTodosFailure>
