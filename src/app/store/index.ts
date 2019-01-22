import { todoReducer } from '@/app/reducers/todo'
import { createStore } from 'redux'

export const configureStore = () => {
  // TODO: apply middleware here
  const store = createStore(todoReducer)

  return store
}
