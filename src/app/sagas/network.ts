import { put } from 'redux-saga/effects'
import { incrementConnection, decrementConnection } from '@/app/actions/network'

export function* putIncrementConnection() {
  yield put(incrementConnection())
}

export function* putDecrementConnection() {
  yield put(decrementConnection())
}
