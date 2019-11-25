import { LoginState } from '@/app/models/Login'
import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  LOGIN: 'LOGIN/LOGIN',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
  LOGOUT: 'LOGIN/LOGOUT',
  LOGOUT_SUCCESS: 'LOGIN/LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGIN/LOGOUT_FAILURE',
} as const

// action creators
// ログイン
export const login = (email: string, password: string) => ({
  type: Type.LOGIN,
  payload: { email, password },
})

export const loginSuccess = ({ id, email, createdAt, session }: LoginState) => ({
  type: Type.LOGIN_SUCCESS,
  payload: { id, email, createdAt, session },
})

export const loginFailure = (errorText: string) => ({
  type: Type.LOGIN_FAILURE,
  payload: { errorText },
})

// ログアウト
export const logout = () => ({
  type: Type.LOGOUT,
})

export const logoutSuccess = () => ({
  type: Type.LOGOUT_SUCCESS,
})

export const logoutFailure = (errorText: string) => ({
  type: Type.LOGOUT_FAILURE,
  payload: { errorText },
})

export type LoginAction = CreateActionTypes<Omit<typeof import('./login'), 'Type'>>
export type LoginDispatcher = CreateDispatcherTypes<Omit<typeof import('./login'), 'Type'>>
