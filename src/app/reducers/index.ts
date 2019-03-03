import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { RootState } from '../models'
import { loginReducer } from './login'
import { todoReducer } from './todo'

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    todoState: todoReducer as any,
    loginState: loginReducer as any,
  })
