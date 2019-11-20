import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse, AxiosError } from 'axios'
import { fetchQuestion } from '@/app/actions/question'
import { Type, postVoteSuccess, postVoteFailure } from '@/app/actions/vote'
import { VoteState } from '@/app/models/Vote'
import { httpGet, HttpResponse } from '@/app/common/http'
import { VoteState as HttpResVoteState } from '@/app/models/HttpResponse'

const VOTE_JSON_URL = 'https://api.myjson.com/bins/hp7x2'

const isVoteResponse = (props: any): props is HttpResVoteState => {
  try {
    const { dislike_voter_ids, like_voter_ids } = props
    return Array.isArray(dislike_voter_ids) && Array.isArray(like_voter_ids)
  } catch (e) {
    console.error(e)
    return false
  }
}

const mapQuestionResponseToState = (res: HttpResVoteState): VoteState => ({
  dislikeVoterIds: res.dislike_voter_ids,
  likeVoterIds: res.like_voter_ids,
})

function* putWithResponse(res: AxiosResponse<unknown>) {
  if (isVoteResponse(res.data)) {
    yield put(postVoteSuccess(mapQuestionResponseToState(res.data)))
  } else {
    console.error('Invalid response')
    console.error(res.data)
    yield put(postVoteFailure('Invalid response'))
  }
}

function* putWithError(error: AxiosError) {
  yield put(postVoteFailure(error.message))
}
// POST
function* postVote(action: any) {
  console.log(action)
  const { path, questionId } = action.payload

  console.log(path)
  const { res, error }: HttpResponse<unknown> = yield call(httpGet, VOTE_JSON_URL)
  // const { res }: HttpResponse<unknown> = yield call(post, ANSWER_JSON_URL, true, 'application/json')
  if (res) {
    yield put(fetchQuestion(`/${questionId}`))
  }
  yield res ? putWithResponse(res) : putWithError(error)
}

export default function*() {
  yield takeLatest(Type.POST_VOTE, postVote)
}
