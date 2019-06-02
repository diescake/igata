import { LoginAction, Type } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'
import { Reducer } from 'redux'

const defaultState: LoginState = {
  token: localStorage.getItem('token') || '',
}

export const loginReducer: Reducer<LoginState, LoginAction> = (state: LoginState = defaultState, action: LoginAction) => {
  switch (action.type) {
    case Type.LOGIN:
      return state

    case Type.LOGIN_SUCCESS:
      const { token } = action.payload
      localStorage.setItem('token', token)
      return { token }

    case Type.LOGIN_FAILURE:
      return state

    case Type.LOGOUT:
      localStorage.removeItem('token')
      location.href = '/login'
      return { token: '' }

    default:
      return state
  }
}
