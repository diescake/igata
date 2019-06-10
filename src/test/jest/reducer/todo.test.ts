import { todoReducer } from '@/app/reducers/todo'

import { Todo, TodoState } from '@/app/models/Todo'
import { addTodo, fetchTodos, fetchTodosSuccess, fetchTodosFailure } from '@/app/actions/todo'

describe('todoReducer', () => {
  const emptyState: TodoState = { todos: [] }

  test('ADD_TODO', () => {
    const action = addTodo('Buy the clothes.')
    expect(todoReducer(emptyState, action)).toEqual({
      todos: [
        {
          done: false,
          text: 'Buy the clothes.',
        },
      ],
    })
  })
  test('FETCH_TODOS', () => {
    const action = fetchTodos()
    expect(todoReducer(emptyState, action)).toBe(emptyState)
  })
  test('FETCH_TODOS_SUCCESS', () => {
    const todo: Todo = { done: true, text: 'Ride a car.' }
    const action = fetchTodosSuccess([todo])
    expect(todoReducer(emptyState, action)).toHaveProperty('todos', [todo])
  })
  test('FETCH_TODOS_FAILURE', () => {
    const action = fetchTodosFailure('403 Forbidden.')
    expect(todoReducer(emptyState, action)).toMatchObject(emptyState)
  })
})
