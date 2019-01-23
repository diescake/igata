// action types
export const ADD_TODO = 'ADD_TODO'

// action creators
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  text,
})

// interface
export type AddTodo = (text: string) => void
