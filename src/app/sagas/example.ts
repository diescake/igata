import { FETCH_TODOS, fetchTodosFailure, fetchTodosSuccess } from '@/app/actions/todo'
import { put, takeLatest } from 'redux-saga/effects'

function* fetchTodos() {
  // TODO: fetch todos from dummy server.
  const ok = true
  const todos = [
    {
      done: false,
      text: 'sleep for 15 hours',
    },
    {
      done: false,
      text: 'eat nice fried rice',
    },
    {
      done: false,
      text: 'watch nice animation movie',
    },
  ]

  if (ok) {
    yield put(fetchTodosSuccess(todos))
  } else {
    yield put(fetchTodosFailure('Generic error'))
  }
}

export default function*() {
  yield takeLatest(FETCH_TODOS, fetchTodos)
}
