import { LoginState } from '@/app/models/Login'
import { TodoState } from '@/app/models/Todo'
import { RouterState } from 'connected-react-router'

export interface RootState {
  readonly router: RouterState
  readonly todoState: TodoState
  readonly loginState: LoginState
}
