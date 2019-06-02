import { Type } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'

const defaultState: LoginState = {
  token: localStorage.getItem('token') || '',
}

// TODO: Can we eliminate "any"s ?
export const loginReducer = (state: LoginState = defaultState, action: any) => {
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
