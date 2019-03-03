import { Type } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'
import { handleActions } from 'redux-actions'

const defaultState: LoginState = {
  token: localStorage.getItem('token') || '',
}

// TODO: Can we eliminate "any"s ?
export const loginReducer = handleActions(
  {
    [Type.LOGIN]: (state: LoginState, action: any) => state,
    [Type.LOGIN_SUCCESS]: (state: LoginState, action: any) => {
      const { token } = action.payload
      localStorage.setItem('token', token)

      return { token }
    },
    [Type.LOGIN_FAILURE]: (state: LoginState, action: any) => state,
    [Type.LOGOUT]: (state: LoginState, action: any) => {
      localStorage.removeItem('token')

      return {
        token: '',
      }
    },
  },
  defaultState
)
