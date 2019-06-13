import axios, { AxiosResponse, AxiosError } from 'axios'
import { RootState } from '@/app/models/index'
import { select } from 'redux-saga/effects'

export interface HttpResponse<T = any> {
  res: AxiosResponse<T>
  error: AxiosError<T>
}

export const getCategory = (res: AxiosResponse) => Math.floor(res.status / 100)

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return res
  },
  (error: AxiosError) => Promise.reject(error)
)

function* getToken() {
  return yield select((state: RootState) => state.loginState.token)
}

const authorizationHeader = (token: string) => (token ? { Authorization: token } : {})
const contentTypeHeader = () => ({ 'Content-Type': 'application/json' })

const internalGet = (url: string, token: string, params: object) =>
  axios
    .get(url, {
      headers: {
        ...authorizationHeader(token),
      },
      params,
    })
    .then((res: AxiosResponse) => ({ res }))
    .catch((error: AxiosError) => ({ error }))

const internalPost = (url: string, token: string, body: object) =>
  axios
    .post(url, body, {
      headers: {
        ...authorizationHeader(token),
        ...contentTypeHeader(),
      },
    })
    .then((res: AxiosResponse) => ({ res }))
    .catch((error: AxiosError) => ({ error }))

const internalDelete = (url: string, token: string, data: object) =>
  axios
    .delete(url, {
      headers: {
        ...authorizationHeader(token),
        ...contentTypeHeader(),
      },
      data,
    })
    .then((res: AxiosResponse) => ({ res }))
    .catch((error: AxiosError) => ({ error }))

const internalPut = (url: string, token: string, body: object) =>
  axios
    .put(url, body, {
      headers: {
        ...authorizationHeader(token),
        ...contentTypeHeader(),
      },
    })
    .then((res: AxiosResponse) => ({ res }))
    .catch((error: AxiosError) => ({ error }))

export function* get(url: string, isAuth: boolean = true, params: object = {}) {
  return internalGet(url, isAuth ? yield getToken() : '', params)
}

export function* post(url: string, isAuth: boolean = true, body: object = {}) {
  return internalPost(url, isAuth ? yield getToken() : '', body)
}

// NOTE: 'delete' is reserved
export function* del(url: string, isAuth: boolean = true, data: object = {}) {
  return internalDelete(url, isAuth ? yield getToken() : '', data)
}

export function* put(url: string, isAuth: boolean = true, data: object = {}) {
  return internalPut(url, isAuth ? yield getToken() : '', data)
}
