import { ADD_TODO } from '@/app/actions/todo'
import { Todo, TodoAction } from '@/app/models/Todo'
import { combineReducers } from 'redux'

const initialState: Todo[] = []
const todos = (state: Todo[] = initialState, action: TodoAction): Todo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          done: false,
          text: action.text,
        },
      ]
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  todos,
})
