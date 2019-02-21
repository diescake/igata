import { Type } from '@/app/actions/todo'
import { Todo } from '@/app/models/Todo'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
// import { combineActions, createActions, handleActions } from 'redux-actions'

const defaultState: Todo[] = []

// HACK: Eliminate this any
const todos = (state: Todo[] = defaultState, action: any): Todo[] => {
  switch (action.type) {
    case Type.ADD_TODO:
      return [
        ...state,
        {
          done: false,
          text: action.payload,
        },
      ]
    case Type.FETCH_TODOS:
      // TODO: set fetching status
      return state
    case Type.FETCH_TODOS_SUCCESS:
      return action.payload
    case Type.FETCH_TODOS_FAILURE:
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
