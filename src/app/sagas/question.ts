import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'

import { push } from 'connected-react-router'
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
import { httpGet, HttpResponse } from '@/app/common/http'

// TODO: URLは仮
// 複数URL
const QUESTIONS_JSON_URL = 'https://api.myjson.com/bins/16s4gy'

// TODO: URLは仮
// 単体URL
const QUESTION_JSON_URL = 'https://api.myjson.com/bins/rqvza'

const QuestionType = {
  FETCH: 'FETCH',
  POST: 'POST',
  PUT: 'PUT',
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

function* putWithQuestionsResponse(res: AxiosResponse<unknown>, type: string) {
  switch (type) {
    case QuestionType.FETCH:
      if (isQuestionsResponse(res.data)) {
        yield put(fetchQuestionsSuccess(mapQuestionsResponseToState(res.data)))
      } else {
        console.error('Invalid response')
        console.error(res.data)
        yield put(fetchQuestionsFailure('Invalid response'))
      }
      break
    case QuestionType.POST:
      if (isQuestionsResponse(res.data)) {
        yield put(postQuestionSuccess(mapQuestionsResponseToState(res.data)))
        yield put(push(paths.root))
      } else {
        console.error('Invalid response')
        console.error(res.data)
        yield put(postQuestionFailure('Invalid response'))
      }
      break
    default:
  }
}

function* putWithQuestionsError(error: AxiosError, type: string) {
  switch (type) {
    case QuestionType.FETCH:
      yield put(fetchQuestionsFailure(error.message))
      break
    case QuestionType.POST:
      yield put(postQuestionFailure(error.message))
      break
    default:
  }
}

function* fetchQuestions(action: any) {
  const query = qs.stringify({
    limit: 10,
    user_id: action.payload ? action.payload.userId : action.payload,
    from_id: action.payload ? action.payload.fromId : action.payload,
  })

  const { res, error }: HttpResponse<unknown> = yield call(httpGet, `${QUESTIONS_JSON_URL}${paths.query}${query}`)
  yield res ? putWithQuestionsResponse(res, QuestionType.FETCH) : putWithQuestionsError(error, QuestionType.FETCH)
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
  switch (type) {
    case QuestionType.FETCH:
      if (isQuestionResponse(res.data)) {
        yield put(fetchQuestionSuccess(mapQuestionResponseToState(res.data)))
      } else {
        console.error('Invalid response')
        console.error(res.data)
        yield put(fetchQuestionFailure('Invalid response'))
      }
      break
    case QuestionType.PUT:
      if (isQuestionResponse(res.data)) {
        yield put(putQuestionSuccess(mapQuestionResponseToState(res.data)))
      } else {
        console.error('Invalid response')
        console.error(res.data)
        yield put(putQuestionFailure('Invalid response'))
      }
      break
    default:
  }
}

function* putWithQuestionError(error: AxiosError, type: string) {
  switch (type) {
    case QuestionType.FETCH:
      yield put(fetchQuestionFailure(error.message))
      break
    case QuestionType.PUT:
      yield put(putQuestionFailure(error.message))
      break
    default:
  }
}

function* fetchQuestion(action: any) {
  const [questionId] = action.payload

  // TODO: ログは削除する
  console.log(`fetchQuestion questionId = ${questionId}`)
  console.log(`fetchQuestion url :${QUESTION_JSON_URL}${paths.addPath(questionId)}`)

  // TODO: 本番環境に切り替えたら修正する。
  // const { res, error }: HttpResponse<unknown> = yield call(get, `${QUESTION_JSON_URL}${paths.addPath(questionId)}`)
  const { res, error }: HttpResponse<unknown> = yield call(httpGet, QUESTION_JSON_URL)
  yield res ? putWithQuestionResponse(res, QuestionType.FETCH) : putWithQuestionError(error, QuestionType.FETCH)
}

// 投稿
function* postQuestion(action: any) {
  const { title, body } = action.payload

  const data = {
    title,
    body,
  }

  // TODO: ログは削除する
  console.log(`postQuestion data: ${data}`)

  // TODO: 本番環境に切り替えたら修正する。
  // const { res, error }: HttpResponse<unknown> = yield call(post, QUESTIONS_JSON_URL, true, 'application/json', data))
  const { res, error }: HttpResponse<unknown> = yield call(httpGet, QUESTIONS_JSON_URL)
  yield res ? putWithQuestionsResponse(res, QuestionType.POST) : putWithQuestionsError(error, QuestionType.POST)
}

// 更新
function* putQuestion(action: any) {
  const { title, body, questionId } = action.payload
  const data = {
    title,
    body,
  }
  // TODO: ログは削除する
  console.log(`putQuestion data: ${data}`)
  console.log(`putQuestion url :${QUESTION_JSON_URL}${paths.addPath(questionId)}`)

  // TODO: 本番環境に切り替えたら修正する。
  // const { res, error }: HttpResponse<unknown> = yield call(put, `${QUESTION_JSON_URL}${paths.addPath(questionId)}`, true, 'application/json', data))
  const { res, error }: HttpResponse<unknown> = yield call(httpGet, QUESTION_JSON_URL)
  yield res ? putWithQuestionResponse(res, QuestionType.PUT) : putWithQuestionError(error, QuestionType.PUT)
}

export default function*() {
  yield takeLatest(Type.FETCH_QUESTIONS, fetchQuestions)
  yield takeLatest(Type.FETCH_QUESTION, fetchQuestion)
  yield takeLatest(Type.POST_QUESTION, postQuestion)
  yield takeLatest(Type.PUT_QUESTION, putQuestion)
}
