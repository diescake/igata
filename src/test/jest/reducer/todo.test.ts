import { todoReducer } from '@/app/reducers/todo'
import { TodoState } from '@/app/models/Todo'
import { addTodo, fetchTodos, fetchTodosSuccess, fetchTodosFailure } from '@/app/actions/todo'

describe('todoReducer', () => {
  const emptyState: TodoState = { todos: [] }

  test('ADD_TODO', () => {
    const action = addTodo('Buy the clothes.')
    expect(todoReducer(emptyState, action)).toEqual({
      todos: [
        {
          id: expect.any(String),
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
    const todoData: TodoState = {
      todos: [
        {
          id: '2ffa8a4b-0d83-4148-8de5-eb9302b05788',
          done: true,
          text: 'Sleep for 15 hours',
        },
        {
          id: 'e01cf278-8e89-43c1-b074-b541db1d1d88',
          done: false,
          text: 'Cook and eat my graceful fried rice',
        },
        {
          id: 'e558dfea-e20d-40a2-b72e-dbc76ca7b679',
          done: false,
          text: 'Eat a nice fried rice',
        },
        {
          id: 'c436a4c9-2d26-4a5d-9723-41f5fc738349',
          done: false,
          text: 'Watch a nice animation movie',
        },
      ],
    }

    const action = fetchTodosSuccess(todoData)
    expect(todoReducer(emptyState, action)).toHaveProperty('todos', todoData.todos)
  })

  test('FETCH_TODOS_FAILURE', () => {
    const action = fetchTodosFailure('403 Forbidden.')
    expect(todoReducer(emptyState, action)).toMatchObject(emptyState)
  })
})
