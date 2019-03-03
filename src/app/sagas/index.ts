import { all, fork } from 'redux-saga/effects'
import login from './login'
import todoApp from './todoApp'

export default function* rootSaga() {
  yield all([fork(todoApp), fork(login)])
}
