import { ADD_TODO } from '@/app/actions/todo'
import { TodoAction, TodoState } from '@/app/models/Todo'
import { combineReducers } from 'redux'

const initialState: TodoState = {
  texts: [],
}

const todos = (state: TodoState = initialState, action: TodoAction) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        texts: [...state.texts, action.text],
      }
    default:
      return state
  }
}

export const todoReducer = combineReducers({
  todos,
})
