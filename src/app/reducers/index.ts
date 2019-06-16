import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { RootState } from '@/app/models'
import { loginReducer } from '@/app/reducers/login'
import { todoReducer } from '@/app/reducers/todo'

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    todoState: todoReducer,
    loginState: loginReducer,
  })
