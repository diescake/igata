import { call, put, takeLatest } from 'redux-saga/effects'
import { paths } from '@/app/common/paths'
import { fetchAnswers } from '@/app/actions/answer'
import { fetchQuestion } from '@/app/actions/question'
import {
  Type,
  postCommentQuestionSuccess,
  postCommentQuestionFailure,
  putCommentQuestionSuccess,
  putCommentQuestionFailure,
  postCommentAnswerSuccess,
  postCommentAnswerFailure,
  putCommentAnswerSuccess,
  putCommentAnswerFailure,
} from '@/app/actions/comment'
import { httpGet, HttpResponse } from '@/app/common/http'

// TODO: URLは仮
const COMMENT_QUESTION_JSON_URL = 'https://api.myjson.com/bins/hp7x2'
const COMMENT_ANSWER_JSON_URL = 'https://api.myjson.com/bins/hp7x2'

// POST Question
function* postCommentQuestion(action: any) {
  const { body, questionId } = action.payload
  const data = {
    body,
  }
  // TODO: "/question"はCOMMENT_QUESTION_JSON_URL含める予定
  const url = `${COMMENT_QUESTION_JSON_URL}${paths.addPath(questionId)}${paths.comment}`
  console.log(`postCommentQuestion questionId: ${questionId}`)
  console.log(`postCommentQuestion data: ${data}`)
  console.log(`postCommentQuestion url: ${url}`)

  // const { res }: HttpResponse<unknown> = yield call(post, url, true, 'application/json', data)
  const { res }: HttpResponse<unknown> = yield call(httpGet, COMMENT_QUESTION_JSON_URL)
  if (res) {
    yield put(fetchQuestion(questionId))
  }
  yield res ? put(postCommentQuestionSuccess()) : put(postCommentQuestionFailure())
}

// PUT  Question
function* putCommentQuestion(action: any) {
  const { body, questionId, commentId } = action.payload
  const data = {
    body,
  }
  // TODO: "/question"はCOMMENT_QUESTION_JSON_URL含める予定
  const url = `${COMMENT_QUESTION_JSON_URL}${paths.addPath(questionId)}${paths.comment}${paths.addPath(commentId)}`

  // TODO: ログは削除する
  console.log(`putCommentQuestion questionId: ${questionId}`)
  console.log(`putCommentQuestion commentId: ${commentId}`)
  console.log(`putCommentQuestion data: ${data}`)
  console.log(`putCommentQuestion url: ${url}`)

  // TODO: 本番環境に切り替えたら修正する。
  // const { res }: HttpResponse<unknown> = yield call(put, url, true, 'application/json', data)
  const { res }: HttpResponse<unknown> = yield call(httpGet, COMMENT_QUESTION_JSON_URL)
  if (res) {
    yield put(fetchQuestion(questionId))
  }
  yield res ? put(putCommentQuestionSuccess()) : put(putCommentQuestionFailure())
}

// POST Answer
function* postCommentAnswer(action: any) {
  const { body, answerId, questionId } = action.payload

  const data = {
    body,
  }

  // TODO: "/answer"はCOMMENT_ANSWER_JSON_URL含める予定
  const url = `${COMMENT_ANSWER_JSON_URL}${paths.addPath(answerId)}${paths.comment}}`

  // TODO: ログは削除する
  console.log(`postCommentAnswer answerId: ${answerId}`)
  console.log(`postCommentAnswer questionId: ${questionId}`)
  console.log(`postCommentAnswer data: ${data}`)
  console.log(`postCommentAnswer url: ${url}`)

  // const { res }: HttpResponse<unknown> = yield call(post, url, true, 'application/json', data)
  const { res }: HttpResponse<unknown> = yield call(httpGet, COMMENT_ANSWER_JSON_URL)

  if (res) {
    yield put(fetchAnswers({ questionId }))
  }
  yield res ? put(postCommentAnswerSuccess()) : put(postCommentAnswerFailure())
}
// PUT  Answer
function* putCommentAnswer(action: any) {
  const { body, answerId, questionId, commentId } = action.payload
  const data = {
    body,
  }
  // TODO: "/answer"はCOMMENT_ANSWER_JSON_URL含める予定
  const url = `${COMMENT_ANSWER_JSON_URL}${paths.addPath(answerId)}${paths.comment}${paths.addPath(commentId)}`

  // TODO: ログは削除する
  console.log(`putCommentAnswer answerId: ${answerId}`)
  console.log(`putCommentAnswer commentId: ${commentId}`)
  console.log(`putCommentAnswer questionId: ${questionId}`)
  console.log(`putCommentAnswer data: ${data}`)
  console.log(`putCommentAnswer url: ${url}`)

  // TODO: 本番環境に切り替えたら修正する。
  // const { res }: HttpResponse<unknown> = yield call(put, url, true, 'application/json', data)
  const { res }: HttpResponse<unknown> = yield call(httpGet, COMMENT_ANSWER_JSON_URL)
  if (res) {
    yield put(fetchAnswers({ questionId }))
  }
  yield res ? put(putCommentAnswerSuccess()) : put(putCommentAnswerFailure())
}

export default function*() {
  yield takeLatest(Type.POST_COMMENT_QUESTION, postCommentQuestion)
  yield takeLatest(Type.PUT_COMMENT_QUESTION, putCommentQuestion)
  yield takeLatest(Type.POST_COMMENT_ANSWER, postCommentAnswer)
  yield takeLatest(Type.PUT_COMMENT_ANSWER, putCommentAnswer)
}
