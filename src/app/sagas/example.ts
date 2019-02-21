import { fetchTodosFailure, fetchTodosSuccess, Type } from '@/app/actions/todo'
import { RootState } from '@/app/models/Todo'
import axios, { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

const TODOS_JSON_URL = 'https://raw.githubusercontent.com/diescake/igata/master/data/todos.json'

function* fetchTodos() {
  const res: AxiosResponse<RootState> = yield call(axios.get, TODOS_JSON_URL)

  if (res.data) {
    yield put(fetchTodosSuccess(res.data.todos))
  } else {
    yield put(fetchTodosFailure(res.statusText))
  }
}

export default function*() {
  yield takeLatest(Type.FETCH_TODOS, fetchTodos)
}
