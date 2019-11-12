import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import { fetchQuestionsFailure, fetchQuestionsSuccess, Type } from '@/app/actions/question'
import { Question } from '@/app/models/Question'
import { get, HttpResponse } from '@/app/common/http'

const QUESTIONS_JSON_URL = 'https://stackoverflow-clone.solomondev.access-company.com/v1/question'

const isQuestionsResponse = (props: any): props is Question[] => {
  try {
    return props.questions.every((question: any) => {
      const { body, comments, createdAt, dislikeVoterIds, id, likeVoterIds, title, userId } = question
      return (
        typeof body === 'string' &&
        typeof comments !== 'undefined' &&
        typeof createdAt === 'string' &&
        typeof dislikeVoterIds === 'string' &&
        typeof id === 'string' &&
        typeof likeVoterIds === 'string' &&
        typeof title === 'string' &&
        typeof userId === 'string'
      )
    })
  } catch (e) {
    console.error(e)
    return false
  }
}

function* putWithResponse(res: AxiosResponse<unknown>) {
  if (isQuestionsResponse(res.data)) {
    yield put(fetchQuestionsSuccess(res.data))
  } else {
    console.error('Invalid response')
    console.error(res.data)
    yield put(fetchQuestionsFailure('Invalid response'))
  }
}

function* putWithError(error: AxiosError) {
  yield put(fetchQuestionsFailure(error.message))
}

function* fetchQuestions() {
  const { res, error }: HttpResponse<unknown> = yield call(get, QUESTIONS_JSON_URL)
  yield res ? putWithResponse(res) : putWithError(error)
}

export default function*() {
  yield takeLatest(Type.FETCH_QUESTIONS, fetchQuestions)
}
