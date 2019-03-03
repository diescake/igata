import { loginFailure, loginSuccess, Type } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'
import axios, { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

const LOGIN_JSON_URL = 'https://raw.githubusercontent.com/diescake/igata/master/data/login.json'

function* login() {
  // NOTE: Actually the login request should be POST
  const res: AxiosResponse<LoginState> = yield call(axios.get, LOGIN_JSON_URL)

  if (res.data) {
    yield put(loginSuccess(res.data))
  } else {
    yield put(loginFailure(res.statusText))
  }
}

export default function*() {
  yield takeLatest(Type.LOGIN, login)
}
