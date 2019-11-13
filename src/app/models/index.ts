import { RouterState } from 'connected-react-router'
import { NetworkState } from '@/app/models/Network'
import { LoginState } from '@/app/models/Login'
import { TodoState } from '@/app/models/Todo'
import { QuestionState } from '@/app/models/Question'
import { AnswerState } from '@/app/models/Answer'

export interface RootState {
  readonly router: RouterState
  readonly networkState: NetworkState
  readonly todoState: TodoState
  readonly loginState: LoginState
  readonly questionState: QuestionState
  readonly answerState: AnswerState
}
