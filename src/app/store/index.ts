import createRootReducer from '@/app/reducers/todo'
import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'

// redux-logger options
// https://github.com/LogRocket/redux-logger#options
const loggerOption = {
  collapsed: true,
  diff: true,
}

export const configureStore = (history: History) => {
  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history), createLogger(loggerOption)))
  )

  return store
}
