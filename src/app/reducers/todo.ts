import { TodoAction, Type } from '@/app/actions/todo'
import { TodoState, Todo } from '@/app/models/Todo'
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
      const index = state.todos.findIndex((todo: Todo) => todo.id === action.payload.id)
      if (index === -1) {
        return state
      }

      return { todos: Object.assign([...state.todos], { [index]: action.payload }) }
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
