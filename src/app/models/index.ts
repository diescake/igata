import { TodoState } from '@/app/models/Todo'
import { RouterState } from 'connected-react-router'

export interface RootState {
  router: RouterState
  todoState: TodoState
}
