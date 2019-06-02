import { Type } from '@/app/actions/todo'
import { TodoState } from '@/app/models/Todo'

const defaultState: TodoState = {
  todos: [
    {
      text: 'Cook and eat my graceful fried rice',
      done: false,
    },
    {
      text: 'Sleep for 15 hours',
      done: true,
    },
  ],
}

// TODO: Can we eliminate "any"s ?
export const todoReducer = (state: TodoState = defaultState, action: any) => {
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
