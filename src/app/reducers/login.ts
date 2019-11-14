import { Reducer } from 'redux'
import { Type, LoginAction } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'
import { paths } from '@/app/common/paths'

const defaultState: LoginState = {
  id: localStorage.getItem('id') || '',
  email: localStorage.getItem('email') || '',
  createdAt: '',
  session: {
    key: localStorage.getItem('key') || '',
    expiresAt: localStorage.getItem('expiresAt') || '',
    passwordSetAt: '',
    passwordExpiresAt: '',
  },
}

export const loginReducer: Reducer<LoginState, LoginAction> = (state: LoginState = defaultState, action: LoginAction) => {
  switch (action.type) {
    case Type.LOGIN:
      return state

    case Type.LOGIN_SUCCESS: {
      const { id, email, session } = action.payload
      localStorage.setItem('id', id)
      localStorage.setItem('email', email)
      localStorage.setItem('key', session.key)
      localStorage.setItem('expiresAt', session.expiresAt)
      window.location.href = paths.root
      return state
    }

    case Type.LOGIN_FAILURE:
      return state

    case Type.LOGOUT:
      return state

    case Type.LOGOUT_SUCCESS:
      localStorage.removeItem('id')
      localStorage.removeItem('email')
      localStorage.removeItem('key')
      localStorage.removeItem('expiresAt')
      window.location.href = paths.login
      return state

    case Type.LOGOUT_FAILURE:
      return state

    default:
      return state
  }
}
