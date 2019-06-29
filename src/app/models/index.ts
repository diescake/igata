import { RouterState } from 'connected-react-router'
import { LoginState } from '@/app/models/Login'
import { TodoState } from '@/app/models/Todo'

export interface RootState {
  readonly router: RouterState
  readonly todoState: TodoState
  readonly loginState: LoginState
}
