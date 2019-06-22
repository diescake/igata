import { LoginState } from '@/app/models/Login'

// action types
export const Type = {
  LOGIN: 'LOGIN/LOGIN',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
  LOGOUT: 'LOGIN/LOGOUT',
} as const

// bound action creator interfaces
export type DispatchLogin = (id: string, password: string) => void
export type DispatchLoginSuccess = (loginState: LoginState) => void
export type DispatchLoginFailure = (errorCode: string) => void
export type DispatchLogout = () => void

// action creators
export const login = () => ({
  type: Type.LOGIN,
})

export const loginSuccess = ({ token, userId }: LoginState) => ({
  type: Type.LOGIN_SUCCESS,
  payload: { token, userId },
})

export const loginFailure = (errorText: string) => ({
  type: Type.LOGIN_FAILURE,
  payload: { errorText },
})

export const logout = () => ({
  type: Type.LOGOUT,
})

export type LoginAction =
  | ReturnType<typeof login>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof logout>
