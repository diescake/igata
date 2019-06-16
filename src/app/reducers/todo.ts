import { TodoAction, Type } from '@/app/actions/todo'
import { TodoState } from '@/app/models/Todo'
import { Reducer } from 'redux'
import uuid from 'uuidv4'

const defaultState: TodoState = {
  todos: [],
}

export const todoReducer: Reducer<TodoState, TodoAction> = (state: TodoState = defaultState, action: TodoAction): TodoState => {
  switch (action.type) {
    case Type.ADD_TODO: {
      const newTodo = {
        id: uuid(),
        done: false,
        text: action.payload.text,
      }

      return { todos: [...state.todos, newTodo] }
    }

    case Type.UPDATE_TODO: {
      const filteredTodo = state.todos.filter(todo => todo.id !== action.payload.id)
      return { todos: [...filteredTodo, action.payload] }
    }

    case Type.FETCH_TODOS:
      return state

    case Type.FETCH_TODOS_SUCCESS:
      return { todos: action.payload.todos }

    case Type.FETCH_TODOS_FAILURE:
      return state

    default:
      return state
  }
}
