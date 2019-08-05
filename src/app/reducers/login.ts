import { Reducer } from 'redux'
import { Type, LoginAction } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'
import { paths } from '@/app/common/paths'

const defaultState: LoginState = {
  token: localStorage.getItem('token') || '',
  userId: localStorage.getItem('userId') || '',
}

export const loginReducer: Reducer<LoginState, LoginAction> = (state: LoginState = defaultState, action: LoginAction) => {
  switch (action.type) {
    case Type.LOGIN:
      return state

    case Type.LOGIN_SUCCESS: {
      const { token, userId } = action.payload
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      return { token, userId }
    }

    case Type.LOGIN_FAILURE:
      return state

    case Type.LOGOUT:
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      window.location.href = paths.login
      return { token: '', userId: '' }

    default:
      return state
  }
}
