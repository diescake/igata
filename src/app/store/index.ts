import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { History } from 'history'

import { createRootReducer } from '@/app/reducers'
import mySaga from '@/app/sagas'

declare global {
  interface Window {
    readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
  }
}

// redux-logger options
// https://github.com/LogRocket/redux-logger#options
const loggerOption = {
  collapsed: true,
  diff: true,
}

const createReduxImmutableStateInvariant = () =>
  // eslint-disable-next-line
  process.env.NODE_ENV !== 'production' ? require('redux-immutable-state-invariant').default() : null

const gracefulApplyMiddleware = (...args: any) => {
  // eslint-disable-next-line
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
