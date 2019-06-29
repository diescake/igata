import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import { loginFailure, loginSuccess, Type } from '@/app/actions/login'
import { LoginResponse } from '@/app/models/HttpResponse'
import { LoginState } from '@/app/models/Login'
import { get, HttpResponse } from '@/app/helpers/http'

const LOGIN_JSON_URL = 'https://raw.githubusercontent.com/diescake/igata/master/data/login.json'

const isLoginResponse = (props: any): props is LoginResponse => {
  try {
    const { token, user_id } = props
    return typeof token === 'string' && typeof user_id === 'string'
  } catch (e) {
    console.error(e)
    return false
  }
}

const mapResponseToState = (res: LoginResponse): LoginState => ({
  token: res.token,
  userId: res.user_id,
})

function* putWithResponse(res: AxiosResponse<unknown>) {
  if (isLoginResponse(res.data)) {
    yield put(loginSuccess(mapResponseToState(res.data)))
  } else {
    console.error('Invalid response')
    console.error(res.data)
    yield put(loginFailure('Invalid response'))
  }
}

function* putWithError(error: AxiosError) {
  yield put(loginFailure(error.message))
}

function* login() {
  // NOTE: Actually the login request should be POST
  const { res, error }: HttpResponse<unknown> = yield call(get, LOGIN_JSON_URL, false)
  yield res ? putWithResponse(res) : putWithError(error)
}

export default function*() {
  yield takeLatest(Type.LOGIN, login)
}
