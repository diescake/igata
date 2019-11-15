import { call, put as reduxPut, takeLatest } from 'redux-saga/effects'
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
import { get, put, HttpResponse } from '@/app/common/http'

const COMMENT_QUESTION_POST_JSON_URL = 'https://api.myjson.com/bins/hp7x2'
const COMMENT_QUESTION_PUT_JSON_URL = 'https://api.myjson.com/bins/hp7x2'
const COMMENT_ANSWER_POST_JSON_URL = 'https://api.myjson.com/bins/hp7x2'
const COMMENT_ANSWER_PUT_JSON_URL = 'https://api.myjson.com/bins/hp7x2'

// POST Question
function* postCommentQuestion(action: any) {
  const { body, path, id } = action.payload
  const data = {
    body,
  }
  const url = `${COMMENT_QUESTION_POST_JSON_URL}${path}`
  console.log(url)
  console.log(data)
  // const { res }: HttpResponse<unknown> = yield call(post, COMMENT_QUESTION_POST_JSON_URL, true, 'application/json', data)
  const { res }: HttpResponse<unknown> = yield call(get, COMMENT_QUESTION_POST_JSON_URL)
  if (res) {
    yield reduxPut(fetchQuestion(`/${id}`))
  }

  yield res ? reduxPut(postCommentQuestionSuccess()) : reduxPut(postCommentQuestionFailure())
}
// PUT  Question
function* putCommentQuestion(action: any) {
  const { res }: HttpResponse<unknown> = yield call(put, COMMENT_QUESTION_PUT_JSON_URL, action.payload)
  yield res ? reduxPut(putCommentQuestionSuccess()) : reduxPut(putCommentQuestionFailure())
}

// POST Answer
function* postCommentAnswer(action: any) {
  const { body, path, id } = action.payload
  const data = {
    body,
  }
  const url = `${COMMENT_QUESTION_POST_JSON_URL}${path}`
  console.log(url)
  console.log(data)
  // const { res }: HttpResponse<unknown> = yield call(post, COMMENT_ANSWER_POST_JSON_URL, true, 'application/json', data)
  const { res }: HttpResponse<unknown> = yield call(get, COMMENT_ANSWER_POST_JSON_URL)

  if (res) {
    yield reduxPut(fetchAnswers(`?question_id=${id}`))
  }
  yield res ? reduxPut(postCommentAnswerSuccess()) : reduxPut(postCommentAnswerFailure())
}
// PUT  Answer
function* putCommentAnswer(action: any) {
  const { res }: HttpResponse<unknown> = yield call(put, COMMENT_ANSWER_PUT_JSON_URL, action.payload)
  yield res ? reduxPut(putCommentAnswerSuccess()) : reduxPut(putCommentAnswerFailure())
}

export default function*() {
  yield takeLatest(Type.POST_COMMENT_QUESTION, postCommentQuestion)
  yield takeLatest(Type.PUT_COMMENT_QUESTION, putCommentQuestion)
  yield takeLatest(Type.POST_COMMENT_ANSWER, postCommentAnswer)
  yield takeLatest(Type.PUT_COMMENT_ANSWER, putCommentAnswer)
}
