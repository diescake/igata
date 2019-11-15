import { all, fork } from 'redux-saga/effects'
import login from '@/app/sagas/login'
import todoApp from '@/app/sagas/todoApp'
import question from '@/app/sagas/question'
import answer from '@/app/sagas/answer'
import comment from '@/app/sagas/comment'

export default function* rootSaga() {
  yield all([fork(todoApp), fork(login), fork(question), fork(answer), fork(comment)])
}
