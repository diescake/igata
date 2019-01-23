import { rootReducer } from '@/app/reducers/todo'
import { createStore } from 'redux'

export const configureStore = () => {
  // TODO: apply middleware here
  const store = createStore(rootReducer)

  return store
}
