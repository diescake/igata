import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'

import { paths } from '@/app/common/paths'
import {
  fetchAnswers as actionFetchAnswers,
  fetchAnswersFailure,
  fetchAnswersSuccess,
  postAnswerSuccess,
  postAnswerFailure,
  putAnswerSuccess,
  putAnswerFailure,
  Type,
} from '@/app/actions/answer'

import { Answer } from '@/app/models/Answer'
import { get, HttpResponse } from '@/app/common/http'
import { Answer as HttpResAnswer } from '@/app/models/HttpResponse'

const ANSWER_JSON_URL = 'https://api.myjson.com/bins/hp7x2'

const isAnswersResponse = (props: any): props is HttpResAnswer[] => {
  try {
    return props.every((question: any) => {
      const { id, body, question_id, user_id, created_at, comments } = question
      return (
        typeof id === 'string' &&
        typeof body === 'string' &&
        typeof question_id === 'string' &&
        typeof user_id === 'string' &&
        typeof created_at === 'string' &&
        Array.isArray(comments)
      )
    })
  } catch (e) {
    console.error(e)
    return false
  }
}
const mapResponseToState = (res: HttpResAnswer[]): Answer[] =>
  res.map(answer => ({
    id: answer.id,
    body: answer.body,
    questionId: answer.question_id,
    createdAt: answer.created_at,
    userId: answer.user_id,
    comments: answer.comments.map(comment => ({
      id: comment.id,
      userId: comment.user_id,
      createdAt: comment.created_at,
      body: comment.body,
    })),
  }))

function* putWithResponse(res: AxiosResponse<unknown>) {
  if (isAnswersResponse(res.data)) {
    yield put(fetchAnswersSuccess(mapResponseToState(res.data)))
  } else {
    console.error('Invalid response')
    console.error(res.data)
    yield put(fetchAnswersFailure('Invalid response'))
  }
}

function* putWithError(error: AxiosError) {
  yield put(fetchAnswersFailure(error.message))
}
// GET
function* fetchAnswers(action: any) {
  const query = qs.stringify({
    question_id: action.payload ? action.payload.questionId : action.payload,
    user_id: action.payload ? action.payload.userId : action.payload,
  })

  const { res, error }: HttpResponse<unknown> = yield call(get, `${ANSWER_JSON_URL}${query ? paths.query : ''}${query}`)
  yield res ? putWithResponse(res) : putWithError(error)
}
// POST
function* postAnswer(action: any) {
  const { body, questionId } = action.payload
  const data = {
    body,
    questionId,
  }
  // TODO: consoleを削除する
  console.log(data)
  const { res }: HttpResponse<unknown> = yield call(get, ANSWER_JSON_URL)
  // const { res }: HttpResponse<unknown> = yield call(post, ANSWER_JSON_URL, true, 'application/json', data)
  if (res) {
    yield put(actionFetchAnswers({ questionId }))
  }
  yield res ? put(postAnswerSuccess()) : put(postAnswerFailure())
}
// PUT
function* putAnswer(action: any) {
  const { path, body, questionId } = action.payload
  const data = {
    body,
  }
  const url = `${ANSWER_JSON_URL}${path}`
  // TODO: consoleを削除する
  console.log(data)
  console.log(url)
  const { res }: HttpResponse<unknown> = yield call(get, ANSWER_JSON_URL)
  // const { res }: HttpResponse<unknown> = yield call(put, ANSWER_JSON_URL, true, 'application/json', data)
  if (res) {
    // データ更新
    yield put(actionFetchAnswers({ questionId }))
  }
  yield res ? put(putAnswerSuccess()) : put(putAnswerFailure())
}

export default function*() {
  yield takeLatest(Type.FETCH_ANSWERS, fetchAnswers)
  yield takeLatest(Type.POST_ANSWER, postAnswer)
  yield takeLatest(Type.PUT_ANSWER, putAnswer)
}
