import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import { push } from 'connected-react-router'
import { loginFailure, loginSuccess, logoutFailure, logoutSuccess, Type } from '@/app/actions/login'
import { LoginState } from '@/app/models/Login'
import { LoginResponse as HttpResLogin } from '@/app/models/HttpResponse'
import { httpGet, HttpResponse } from '@/app/common/http'
import { paths } from '@/app/common/paths'

// TODO: URLは仮
// const LOGIN_JSON_URL = 'https://raw.githubusercontent.com/diescake/igata/master/data/login.json'
const LOGIN_JSON_URL = 'https://api.myjson.com/bins/ne4gm'
const LOGOUT_JSON_URL = 'https://api.myjson.com/bins/ne4gm'

const isLoginResponse = (props: any): props is HttpResLogin => {
  try {
    const { id, email, created_at, session } = props
    return typeof id === 'string' && typeof email === 'string' && typeof created_at === 'string' && typeof session === 'object'
  } catch (e) {
    console.error(e)
    return false
  }
}

const mapResponseToState = (res: HttpResLogin): LoginState => ({
  id: res.id,
  email: res.email,
  createdAt: res.created_at,
  session: {
    token: res.session.token,
    expiresAt: res.session.expires_at,
    passwordSetAt: res.session.password_set_at,
    passwordExpiresAt: res.session.password_expires_at,
  },
})

function* putWithResponse(res: AxiosResponse<unknown>) {
  if (isLoginResponse(res.data)) {
    yield put(loginSuccess(mapResponseToState(res.data)))
    yield put(push(paths.root))
  } else {
    console.error('Invalid response')
    console.error(res.data)
    yield put(loginFailure('Invalid response'))
  }
}

function* putWithError(error: AxiosError) {
  yield put(loginFailure(error.message))
}

// TODO: 通信先を変更したら修正する。
function* login() {
  // NOTE: Actually the login request should be POST
  // function* login(actions: any) {
  // const { res, error }: HttpResponse<unknown> = yield call(post, LOGIN_JSON_URL, actions.payload)
  const { res, error }: HttpResponse<unknown> = yield call(httpGet, LOGIN_JSON_URL, false)
  yield res ? putWithResponse(res) : putWithError(error)
}

function* putWithResponseLogout() {
  yield put(logoutSuccess())
  yield put(push(paths.login))
}

function* logout() {
  const { res, error }: HttpResponse<unknown> = yield call(httpGet, LOGOUT_JSON_URL, false)
  yield res ? putWithResponseLogout() : put(logoutFailure(error.message))
}

export default function*() {
  yield takeLatest(Type.LOGIN, login)
  yield takeLatest(Type.LOGOUT, logout)
}
