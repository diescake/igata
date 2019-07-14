import { RouterState } from 'connected-react-router'
import { NetworkState } from '@/app/models/Network'
import { LoginState } from '@/app/models/Login'
import { TodoState } from '@/app/models/Todo'

export interface RootState {
  readonly router: RouterState
  readonly networkState: NetworkState
  readonly todoState: TodoState
  readonly loginState: LoginState
}
