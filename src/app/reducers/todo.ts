import { TodoAction, Type } from '@/app/actions/todo'
import { TodoState } from '@/app/models/Todo'
import { Reducer } from 'redux'

const defaultState: TodoState = {
  todos: [],
}

export const todoReducer: Reducer<TodoState, TodoAction> = (state: TodoState = defaultState, action: TodoAction): TodoState => {
  switch (action.type) {
    case Type.ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            done: false,
            text: action.payload.text,
          },
        ],
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
