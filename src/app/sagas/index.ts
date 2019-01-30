import { all, fork } from 'redux-saga/effects'
import example from './example'

export default function* rootSaga() {
  yield all([fork(example)])
}
