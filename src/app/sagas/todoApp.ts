import { fetchTodosFailure, fetchTodosSuccess, Type } from '@/app/actions/todo'
import { TodoState } from '@/app/models/Todo'
import { get, HttpResponse } from '@/app/helpers/http'
import { call, put, takeLatest } from 'redux-saga/effects'

// NOTE: "myjson.com" supports CORS and allows basic headers and methods.
const TODOS_JSON_URL = 'https://api.myjson.com/bins/81wtd'

function* fetchTodos() {
  const { res, error }: HttpResponse<TodoState> = yield call(get, TODOS_JSON_URL)
  if (error) {
    yield put(fetchTodosFailure(error.message))
    return
  }

  switch (res.status) {
    case 200:
      yield put(fetchTodosSuccess(res.data.todos))
      break
    default:
      yield put(fetchTodosFailure(res.statusText))
  }
}

export default function*() {
  yield takeLatest(Type.FETCH_TODOS, fetchTodos)
}
