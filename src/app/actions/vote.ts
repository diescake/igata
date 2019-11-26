import { VoteState } from '@/app/models/Vote'
import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  POST_VOTE: 'VOTES/POST_VOTE',
  POST_VOTE_SUCCESS: 'VOTES/POST_VOTE_SUCCESS',
  POST_VOTE_FAILURE: 'VOTES/POST_VOTE_FAILURE',
} as const

// action creators
// POST
export const postVote = (questionId: string, voteType: string) => ({
  type: Type.POST_VOTE,
  payload: { questionId, voteType },
})

export const postVoteSuccess = ({ dislikeVoterIds, likeVoterIds }: VoteState) => ({
  type: Type.POST_VOTE_SUCCESS,
  payload: { dislikeVoterIds, likeVoterIds },
})

export const postVoteFailure = (errorText: string) => ({
  type: Type.POST_VOTE_FAILURE,
  payload: { errorText },
})
export type VoteAction = CreateActionTypes<Omit<typeof import('./vote'), 'Type'>>
export type VoteDispatcher = CreateDispatcherTypes<Omit<typeof import('./vote'), 'Type'>>
