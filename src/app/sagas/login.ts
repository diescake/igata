import { loginFailure, loginSuccess, Type } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'
import { get, HttpResponse } from '@/app/helpers/http'
import { call, put, takeLatest } from 'redux-saga/effects'

const LOGIN_JSON_URL = 'https://raw.githubusercontent.com/diescake/igata/master/data/login.json'

function* login() {
  // NOTE: Actually the login request should be POST
  const { res, error }: HttpResponse<LoginState> = yield call(get, LOGIN_JSON_URL, false)
  if (error) {
    yield put(loginFailure(error.message))
    return
  }

  switch (res.status) {
    case 200:
      yield put(loginSuccess(res.data))
      break
    default:
      yield put(loginFailure(res.statusText))
  }
}

export default function*() {
  yield takeLatest(Type.LOGIN, login)
}
