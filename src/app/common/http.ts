import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { select } from 'redux-saga/effects'
import { putIncrementConnection, putDecrementConnection } from '@/app//sagas/network'
import { RootState } from '@/app/models/index'
import { paths } from '@/app/common/paths'
import { ContentType } from '@/app/common/types'

export interface HttpResponse<T = any> {
  res: AxiosResponse<T>
  error: AxiosError<T>
}

export const getCategory = (res: AxiosResponse) => Math.floor(res.status / 100)

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // NOTE: Put common configs here about HTTP Requests.
    return config
  },

  // TODO: When does the following onRejected route run ?
  (error: AxiosError) => {
    console.error(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  // 2xx
  (res: AxiosResponse) => res,

  // Except for 2xx
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = paths.root
    }

    return Promise.reject(error)
  }
)

function* inspect(promise: Promise<unknown>) {
  // FIXME: There are cases in which collapse the consistency
  // because the called functions by takeLatest may omit the duplicating process.
  yield putIncrementConnection()
  const ret = yield promise
  yield putDecrementConnection()
  return ret
}

function* selectToken() {
  return yield select((state: RootState) => state.loginState.token)
}

const authorizationHeader = (token: string) => (token ? { Authorization: token } : {})
const contentTypeHeader = (contentType: ContentType = 'application/json') => ({ 'Content-Type': contentType })

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

const internalPost = (url: string, token: string, contentType?: ContentType, body?: object) =>
  axios
    .post(url, body || {}, {
      headers: {
        ...authorizationHeader(token),
        ...contentTypeHeader(contentType),
      },
    })
    .then((res: AxiosResponse) => ({ res }))
    .catch((error: AxiosError) => ({ error }))

const internalDelete = (url: string, token: string, data: object) =>
  axios
    .delete(url, {
      headers: {
        ...authorizationHeader(token),
      },
      data,
    })
    .then((res: AxiosResponse) => ({ res }))
    .catch((error: AxiosError) => ({ error }))

const internalPut = (url: string, token: string, contentType?: ContentType, body?: object) =>
  axios
    .put(url, body || {}, {
      headers: {
        ...authorizationHeader(token),
        ...contentTypeHeader(contentType),
      },
    })
    .then((res: AxiosResponse) => ({ res }))
    .catch((error: AxiosError) => ({ error }))

const internalPatch = (url: string, token: string, contentType?: ContentType, body?: object) =>
  axios
    .patch(url, body || {}, {
      headers: {
        ...authorizationHeader(token),
        ...contentTypeHeader(contentType),
      },
    })
    .then((res: AxiosResponse) => ({ res }))
    .catch((error: AxiosError) => ({ error }))

export function* get(url: string, isAuth = true, params: object = {}) {
  return yield inspect(internalGet(url, isAuth ? yield selectToken() : '', params))
}

export function* post(url: string, isAuth = true, contentType?: ContentType, data?: object) {
  return yield inspect(internalPost(url, isAuth ? yield selectToken() : '', contentType, data))
}

// NOTE: Unfortunately, 'delete' is reserved
export function* del(url: string, isAuth = true, data: object = {}) {
  return yield inspect(internalDelete(url, isAuth ? yield selectToken() : '', data))
}

export function* put(url: string, isAuth = true, contentType?: ContentType, data?: object) {
  return yield inspect(internalPut(url, isAuth ? yield selectToken() : '', contentType, data))
}

export function* patch(url: string, isAuth = true, contentType?: ContentType, data?: object) {
  return yield inspect(internalPatch(url, isAuth ? yield selectToken() : '', contentType, data))
}
