export interface LoginResponse {
  token: string
}

// action types
export const Type = {
  LOGIN: 'LOGIN/LOGIN' as 'LOGIN/LOGIN',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS' as 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE' as 'LOGIN/LOGIN_FAILURE',
  LOGOUT: 'LOGIN/LOGOUT' as 'LOGIN/LOGOUT',
}

// action creator interfaces
export type Login = (id: string, password: string) => void
export type LoginSuccess = (token: string) => void
export type LoginFailure = (errorCode: string) => void
export type Logout = () => void

// action creators
export const login = () => ({
  type: Type.LOGIN,
})

export const loginSuccess = ({ token }: LoginResponse) => ({
  type: Type.LOGIN_SUCCESS,
  payload: { token },
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
