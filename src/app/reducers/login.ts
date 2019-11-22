import { Reducer } from 'redux'
import { Type, LoginAction } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'

const defaultState: LoginState = {
  id: localStorage.getItem('id') || '',
  email: localStorage.getItem('email') || '',
  createdAt: '',
  session: {
    token: localStorage.getItem('token') || '',
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
      const { id, email, createdAt, session } = action.payload
      localStorage.setItem('id', id)
      localStorage.setItem('email', email)
      localStorage.setItem('token', session.token)
      localStorage.setItem('expiresAt', session.expiresAt)
      return {
        ...state,
        id,
        email,
        createdAt,
        session,
      }
    }

    case Type.LOGIN_FAILURE:
      return state

    case Type.LOGOUT:
      return state

    case Type.LOGOUT_SUCCESS:
      localStorage.removeItem('id')
      localStorage.removeItem('email')
      localStorage.removeItem('token')
      localStorage.removeItem('expiresAt')

      return {
        ...state,
        id: '',
        email: '',
        createdAt: '',
        session: { token: '', expiresAt: '', passwordSetAt: '', passwordExpiresAt: '' },
      }

    case Type.LOGOUT_FAILURE:
      return state

    default:
      return state
  }
}
