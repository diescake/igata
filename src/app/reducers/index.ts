import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { RootState } from '@/app/models'
import { networkReducer } from '@/app/reducers/network'
import { loginReducer } from '@/app/reducers/login'
import { questionReducer } from '@/app/reducers/question'
import { answerReducer } from '@/app/reducers/answer'
import { commentReducer } from '@/app/reducers/comment'
import { voteReducer } from '@/app/reducers/vote'

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    networkState: networkReducer,
    loginState: loginReducer,
    questionState: questionReducer,
    answerState: answerReducer,
    commentState: commentReducer,
    voteState: voteReducer,
  })
