import { all, fork } from 'redux-saga/effects'
import login from '@/app/sagas/login'
import todoApp from '@/app/sagas/todoApp'
import question from '@/app/sagas/question'

export default function* rootSaga() {
  yield all([fork(todoApp), fork(login), fork(question)])
}
