import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import {
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  // fetchQuestionFailure,
  // fetchQuestionSuccess,
  postQuestionSuccess,
  postQuestionFailure,
  Type,
} from '@/app/actions/question'
import { Question } from '@/app/models/Question'
import { Question as HttpResQuestion } from '@/app/models/HttpResponse'
import { get, post, HttpResponse } from '@/app/common/http'

const QUESTIONS_JSON_URL = 'https://api.myjson.com/bins/16s4gy'

// 単体
// const isQuestionResponse = (props: any): props is HttpResQuestion => {
//   try {
//     return props.every((question: any) => {
//       const { id, title, body, user_id, created_at, comments, like_voter_ids } = question
//       return (
//         typeof id === 'string' &&
//         typeof title === 'string' &&
//         typeof body === 'string' &&
//         typeof user_id === 'string' &&
//         typeof created_at === 'string' &&
//         Array.isArray(comments) &&
//         Array.isArray(like_voter_ids)
//       )
//     })
//   } catch (e) {
//     console.error(e)
//     return false
//   }
// }

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
const mapResponseToState = (res: HttpResQuestion[]): Question[] =>
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

// const mapResponseToState = (res: HttpResQuestion): Question => res => ({
//   body: res.body,
//   comments: res.comments,
//   createdAt: res.created_at,
//   dislikeVoterIds: res.dislike_voter_ids,
//   id: res.id,
//   likeVoterIds: res.like_voter_ids,
//   title: res.title,
//   userId: res.user_id,
// })

function* putWithResponse(res: AxiosResponse<unknown>) {
  if (isQuestionsResponse(res.data)) {
    yield put(fetchQuestionsSuccess(mapResponseToState(res.data)))
  } else {
    console.error('Invalid response')
    console.error(res.data)
    yield put(fetchQuestionsFailure('Invalid response'))
  }
}

function* putWithError(error: AxiosError) {
  yield put(fetchQuestionsFailure(error.message))
}

function* fetchQuestions(action: any) {
  const { res, error }: HttpResponse<unknown> = yield call(get, QUESTIONS_JSON_URL + (action.payload ? action.payload : ''))
  yield res ? putWithResponse(res) : putWithError(error)
}

function* fetchQuestion(action: any) {
  const { res, error }: HttpResponse<unknown> = yield call(get, QUESTIONS_JSON_URL + action.payload)
  yield res ? putWithResponse(res) : putWithError(error)
}

function* postQuestion(action: any) {
  const { res }: HttpResponse<unknown> = yield call(post, QUESTIONS_JSON_URL, action.payload)
  yield res ? put(postQuestionSuccess()) : put(postQuestionFailure())
}

export default function*() {
  yield takeLatest(Type.FETCH_QUESTION, fetchQuestion)
  yield takeLatest(Type.FETCH_QUESTIONS, fetchQuestions)
  yield takeLatest(Type.POST_QUESTION, postQuestion)
}
