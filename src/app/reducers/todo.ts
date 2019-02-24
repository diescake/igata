import { Type } from '@/app/actions/todo'
import { TodoState } from '@/app/models/Todo'
import { handleActions } from 'redux-actions'

const defaultState: TodoState = {
  todos: [],
}

// TODO: Can we eliminate any ?
export const todoReducer = handleActions(
  {
    [Type.ADD_TODO]: (state: TodoState, action: any) => ({
      todos: [
        ...state.todos,
        {
          done: false,
          text: action.payload,
        },
      ],
    }),
    [Type.FETCH_TODOS]: (state: TodoState, action: any) => state,
    [Type.FETCH_TODOS_SUCCESS]: (state: TodoState, action: any) => ({ todos: action.payload }),
    [Type.FETCH_TODOS_FAILURE]: (state: TodoState, action: any) => state,
  },
  defaultState
)
