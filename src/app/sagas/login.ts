import { call, put, takeLatest } from 'redux-saga/effects'
import { loginFailure, loginSuccess, Type } from '@/app/actions/login'
import { LoginResponse } from '@/app/models/HttpResponse'
import { LoginState } from '@/app/models/Login'
import { get, HttpResponse } from '@/app/helpers/http'

const LOGIN_JSON_URL = 'https://raw.githubusercontent.com/diescake/igata/master/data/login.json'

const mapResponseToState = (res: LoginResponse): LoginState => ({
  token: res.token,
  userId: res.user_id,
})

function* login() {
  // NOTE: Actually the login request should be POST
  const { res, error }: HttpResponse<LoginResponse> = yield call(get, LOGIN_JSON_URL, false)
  if (res) {
    yield put(loginSuccess(mapResponseToState(res.data)))
  } else {
    yield put(loginFailure(error.message))
  }
}

export default function*() {
  yield takeLatest(Type.LOGIN, login)
}
