import { LoginState } from '@/app/models/Login'
import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  LOGIN: 'LOGIN/LOGIN',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
  LOGOUT: 'LOGIN/LOGOUT',
} as const

// action creators
export const login = (address: string, pw: string) => ({
  type: Type.LOGIN,
  payload: { email: address, password: pw },
})

export const loginSuccess = ({ id, email, createdAt, session }: LoginState) => ({
  type: Type.LOGIN_SUCCESS,
  payload: { id, email, createdAt, session },
})

export const loginFailure = (errorText: string) => ({
  type: Type.LOGIN_FAILURE,
  payload: { errorText },
})

export const logout = () => ({
  type: Type.LOGOUT,
})

export type LoginAction = CreateActionTypes<Omit<typeof import('./login'), 'Type'>>
export type LoginDispatcher = CreateDispatcherTypes<Omit<typeof import('./login'), 'Type'>>
