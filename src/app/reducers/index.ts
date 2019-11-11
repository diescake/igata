import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { RootState } from '@/app/models'
import { networkReducer } from '@/app/reducers/network'
import { loginReducer } from '@/app/reducers/login'
import { todoReducer } from '@/app/reducers/todo'
import { questionReducer } from '@/app/reducers/quest'

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    networkState: networkReducer,
    questionState: questionReducer,
    todoState: todoReducer,
    loginState: loginReducer,
  })
