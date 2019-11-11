import { all, fork } from 'redux-saga/effects'
import login from '@/app/sagas/login'
import todoApp from '@/app/sagas/todoApp'
import top from '@/app/sagas/top'

export default function* rootSaga() {
  yield all([fork(todoApp), fork(login), fork(top)])
}
