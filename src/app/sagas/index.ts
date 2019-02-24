import { all, fork } from 'redux-saga/effects'
import todoApp from './todoApp'

export default function* rootSaga() {
  yield all([fork(todoApp)])
}
