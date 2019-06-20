import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchTodosFailure, fetchTodosSuccess, Type } from '@/app/actions/todo'
import { TodosResponse } from '@/app/models/HttpResponse'
import { TodoState } from '@/app/models/Todo'
import { get, HttpResponse } from '@/app/helpers/http'

// NOTE: "myjson.com" supports CORS and allows basic headers and methods.
const TODOS_JSON_URL = 'https://api.myjson.com/bins/gagz1'

const mapResponseToState = (res: TodosResponse): TodoState => ({
  todos: res.todos,
})

function* fetchTodos() {
  const { res, error }: HttpResponse<TodosResponse> = yield call(get, TODOS_JSON_URL)
  if (res) {
    yield put(fetchTodosSuccess(mapResponseToState(res.data)))
  } else {
    yield put(fetchTodosFailure(error.message))
  }
}

export default function*() {
  yield takeLatest(Type.FETCH_TODOS, fetchTodos)
}
