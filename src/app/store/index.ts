import createRootReducer from '@/app/reducers/todo'
import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'

export const configureStore = (history: History) => {
  const store = createStore(createRootReducer(history), compose(applyMiddleware(routerMiddleware(history))))

  return store
}
