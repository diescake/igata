import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import { fetchTodosFailure, fetchTodosSuccess, Type } from '@/app/actions/todo'
import { TodosResponse } from '@/app/models/HttpResponse'
import { Todo } from '@/app/models/Todo'
import { get, HttpResponse } from '@/app/helpers/http'

// NOTE: "myjson.com" supports CORS and allows basic headers and methods.
const TODOS_JSON_URL = 'https://api.myjson.com/bins/gagz1'

const isTodosResponse = (props: any): props is TodosResponse => {
  try {
    return props.todos.every((todo: any) => {
      const { id, done, text } = todo
      return typeof id === 'string' && typeof done === 'boolean' && typeof text === 'string'
    })
  } catch (e) {
    console.error(e)
    return false
  }
}

const mapResponseToState = (res: TodosResponse): Todo[] => res.todos

function* putWithResponse(res: AxiosResponse<unknown>) {
  if (isTodosResponse(res.data)) {
    yield put(fetchTodosSuccess(mapResponseToState(res.data)))
  } else {
    console.error('Invalid response')
    console.error(res.data)
    yield put(fetchTodosFailure('Invalid response'))
  }
}

function* putWithError(error: AxiosError) {
  yield put(fetchTodosFailure(error.message))
}

function* fetchTodos() {
  const { res, error }: HttpResponse<unknown> = yield call(get, TODOS_JSON_URL)
  yield res ? putWithResponse(res) : putWithError(error)
}

export default function*() {
  yield takeLatest(Type.FETCH_TODOS, fetchTodos)
}
