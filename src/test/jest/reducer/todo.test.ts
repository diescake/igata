import { todoReducer } from '@/app/reducers/todo'
import { TodoState, Todo } from '@/app/models/Todo'
import { addTodo, updateTodo, fetchTodos, fetchTodosSuccess, fetchTodosFailure } from '@/app/actions/todo'

describe('todoReducer', () => {
  const emptyState: TodoState = { todos: [] }
  const baseState: TodoState = {
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
    ],
  }

  const newTodo: Todo = {
    id: '93056462-8924-474e-b68e-dc16906ac4be',
    done: false,
    text: 'Watch a nice animation movie',
  }

  const storedTodo: Todo = {
    id: 'e01cf278-8e89-43c1-b074-b541db1d1d88',
    done: true,
    text: 'Contribute to igata project.',
  }

  const updatedState: TodoState = {
    todos: [
      {
        id: '2ffa8a4b-0d83-4148-8de5-eb9302b05788',
        done: true,
        text: 'Sleep for 15 hours',
      },
      {
        id: 'e01cf278-8e89-43c1-b074-b541db1d1d88',
        done: true,
        text: 'Contribute to igata project.',
      },
    ],
  }
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

  test('UPDATE_TODO_1', () => {
    const action = updateTodo(newTodo)
    expect(todoReducer(baseState, action)).toEqual(baseState)
  })

  test('UPDATE_TODO_2', () => {
    const action = updateTodo(storedTodo)
    expect(todoReducer(baseState, action)).toEqual(updatedState)
  })

  test('FETCH_TODOS', () => {
    const action = fetchTodos()
    expect(todoReducer(emptyState, action)).toEqual(emptyState)
  })

  test('FETCH_TODOS_SUCCESS', () => {
    const action = fetchTodosSuccess(baseState)
    expect(todoReducer(emptyState, action)).toEqual(baseState)
  })

  test('FETCH_TODOS_FAILURE', () => {
    const action = fetchTodosFailure('403 Forbidden.')
    expect(todoReducer(emptyState, action)).toMatchObject(emptyState)
  })
})
