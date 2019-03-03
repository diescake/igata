import { createAction } from 'redux-actions'

// action types
export enum Type {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
}

// action creator interfaces
export type Login = (id: string, password: string) => void
export type LoginSuccess = (token: string) => void
export type LoginFailure = (errorCode: string) => void
export type Logout = () => void

// action creators
export const login = createAction(Type.LOGIN)
export const loginSuccess = createAction(Type.LOGIN_SUCCESS)
export const loginFailure = createAction(Type.LOGIN_FAILURE)
export const logout = createAction(Type.LOGOUT)
