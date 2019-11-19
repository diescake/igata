import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'

import { paths } from '@/app/common/paths'
import {
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  fetchQuestionFailure,
  fetchQuestionSuccess,
  postQuestionSuccess,
  postQuestionFailure,
  putQuestionSuccess,
  putQuestionFailure,
  Type,
} from '@/app/actions/question'
import { Question } from '@/app/models/Question'
import { Question as HttpResQuestion } from '@/app/models/HttpResponse'
import { get, HttpResponse } from '@/app/common/http'

const QUESTIONS_JSON_URL = 'https://api.myjson.com/bins/16s4gy'

// 単体URL
const QUESTION_JSON_URL = 'https://api.myjson.com/bins/rqvza'

const EnumQuestionType = {
  fetch: 'fetch',
  put: 'put',
}

// 複数
const isQuestionsResponse = (props: any): props is HttpResQuestion[] => {
  try {
    return props.every((question: any) => {
      const { id, title, body, user_id, created_at, comments, like_voter_ids } = question
      return (
        typeof id === 'string' &&
        typeof title === 'string' &&
        typeof body === 'string' &&
        typeof user_id === 'string' &&
        typeof created_at === 'string' &&
        Array.isArray(comments) &&
        Array.isArray(like_voter_ids)
      )
    })
  } catch (e) {
    console.error(e)
    return false
  }
}

const mapQuestionsResponseToState = (res: HttpResQuestion[]): Question[] =>
  res.map(question => ({
    body: question.body,
    comments: question.comments.map(comment => ({
      body: comment.body,
      createdAt: comment.created_at,
      id: comment.id,
      userId: comment.user_id,
    })),
    createdAt: question.created_at,
    dislikeVoterIds: question.dislike_voter_ids,
    id: question.id,
    likeVoterIds: question.like_voter_ids,
    title: question.title,
    userId: question.user_id,
  }))

function* putWithQuestionsResponse(res: AxiosResponse<unknown>) {
  if (isQuestionsResponse(res.data)) {
    yield put(fetchQuestionsSuccess(mapQuestionsResponseToState(res.data)))
  } else {
    console.error('Invalid response')
    console.error(res.data)
    yield put(fetchQuestionsFailure('Invalid response'))
  }
}

function* putWithQuestionsError(error: AxiosError) {
  yield put(fetchQuestionsFailure(error.message))
}

function* fetchQuestions(action: any) {
  const query = qs.stringify({
    limit: 10,
    user_id: action.payload.userId,
    from_id: action.payload.fromId,
  })

  const { res, error }: HttpResponse<unknown> = yield call(get, `${QUESTIONS_JSON_URL}${paths.query}${query}`)
  yield res ? putWithQuestionsResponse(res) : putWithQuestionsError(error)
}

// 単体
const isQuestionResponse = (props: any): props is HttpResQuestion => {
  try {
    const { id, title, body, user_id, created_at, comments, like_voter_ids } = props
    return (
      typeof id === 'string' &&
      typeof title === 'string' &&
      typeof body === 'string' &&
      typeof user_id === 'string' &&
      typeof created_at === 'string' &&
      Array.isArray(comments) &&
      Array.isArray(like_voter_ids)
    )
  } catch (e) {
    console.error(e)
    return false
  }
}

const mapQuestionResponseToState = (res: HttpResQuestion): Question => ({
  body: res.body,
  comments: res.comments.map(comment => ({
    body: comment.body,
    createdAt: comment.created_at,
    id: comment.id,
    userId: comment.user_id,
  })),
  createdAt: res.created_at,
  dislikeVoterIds: res.dislike_voter_ids,
  id: res.id,
  likeVoterIds: res.like_voter_ids,
  title: res.title,
  userId: res.user_id,
})

function* putWithQuestionResponse(res: AxiosResponse<unknown>, type: string) {
  if (type === EnumQuestionType.fetch) {
    if (isQuestionResponse(res.data)) {
      yield put(fetchQuestionSuccess(mapQuestionResponseToState(res.data)))
    } else {
      console.error('Invalid response')
      console.error(res.data)
      yield put(fetchQuestionFailure('Invalid response'))
    }
  } else if (type === EnumQuestionType.put) {
    if (isQuestionResponse(res.data)) {
      yield put(putQuestionSuccess(mapQuestionResponseToState(res.data)))
    } else {
      console.error('Invalid response')
      console.error(res.data)
      yield put(putQuestionFailure('Invalid response'))
    }
  }
}

function* putWithQuestionError(error: AxiosError) {
  yield put(fetchQuestionFailure(error.message))
}

function* fetchQuestion() {
  // TODO: 本番環境に切り替えたら修正する。
  // function* fetchQuestion(action: any) {
  // const { res, error }: HttpResponse<unknown> = yield call(get, QUESTION_JSON_URL + action.payload)
  const { res, error }: HttpResponse<unknown> = yield call(get, QUESTION_JSON_URL)
  yield res ? putWithQuestionResponse(res, EnumQuestionType.fetch) : putWithQuestionError(error)
}

// 投稿
function* postQuestion(action: any) {
  const data = {
    title: action.payload.title,
    body: action.payload.body,
  }
  console.log(action)
  console.log(data)

  // const { res, error }: HttpResponse<unknown> = yield call(post, QUESTION_JSON_URL, true, 'application/json', data))
  const { res, error }: HttpResponse<unknown> = yield call(get, QUESTION_JSON_URL)
  yield res ? put(postQuestionSuccess()) : put(postQuestionFailure(error.message))
}

// 更新
function* putQuestion(action: any) {
  const { title, body, id } = action.payload

  const data = {
    title,
    body,
  }
  const url = `${QUESTION_JSON_URL}/${id}`
  console.log(action)
  console.log(data)
  console.log(url)
  // const { res, error }: HttpResponse<unknown> = yield call(put, QUESTION_JSON_URL, true, 'application/json', data))
  const { res, error }: HttpResponse<unknown> = yield call(get, QUESTION_JSON_URL)
  yield res ? putWithQuestionResponse(res, EnumQuestionType.put) : putWithQuestionError(error)
}

export default function*() {
  yield takeLatest(Type.FETCH_QUESTIONS, fetchQuestions)
  yield takeLatest(Type.FETCH_QUESTION, fetchQuestion)
  yield takeLatest(Type.POST_QUESTION, postQuestion)
  yield takeLatest(Type.PUT_QUESTION, putQuestion)
}
