import { ADD_TODO, FETCH_TODOS, FETCH_TODOS_FAILURE, FETCH_TODOS_SUCCESS } from '@/app/actions/todo'
import { Todo } from '@/app/models/Todo'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'

const initialState: Todo[] = []

// HACK: Eliminate this any
const todos = (state: Todo[] = initialState, action: any): Todo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          done: false,
          text: action.text,
        },
      ]
    case FETCH_TODOS:
      // TODO: set fetching status
      return state
    case FETCH_TODOS_SUCCESS:
      return action.todos
    case FETCH_TODOS_FAILURE:
      // TODO: set error status
      return state
    default:
      return state
  }
}

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    todos,
  })
