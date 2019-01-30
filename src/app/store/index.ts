import createRootReducer from '@/app/reducers/todo'
import mySaga from '@/app/sagas'
import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// redux-logger options
// https://github.com/LogRocket/redux-logger#options
const loggerOption = {
  collapsed: true,
  diff: true,
}

const createReduxImmutableStateInvariant = () =>
  // tslint:disable: no-require-imports
  process.env.NODE_ENV !== 'production' ? require('redux-immutable-state-invariant').default() : null

const gracefulApplyMiddleware = (...args: any) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return composeEnhancers(applyMiddleware(...args.filter((v: any) => v)))
}

export const configureStore = (history: History) => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    createRootReducer(history),
    gracefulApplyMiddleware(
      sagaMiddleware,
      createReduxImmutableStateInvariant(),
      routerMiddleware(history),
      createLogger(loggerOption)
    )
  )

  sagaMiddleware.run(mySaga)

  return store
}
