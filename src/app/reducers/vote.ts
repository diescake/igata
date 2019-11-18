import { Reducer } from 'redux'
import { Type, VoteAction } from '@/app/actions/vote'
import { VoteState } from '@/app/models/Vote'

const defaultState: VoteState = {
  likeVoterIds: [],
  dislikeVoterIds: [],
}

export const voteReducer: Reducer<VoteState, VoteAction> = (state: VoteState = defaultState, action: VoteAction): VoteState => {
  switch (action.type) {
    case Type.POST_VOTE: {
      return state
    }
    case Type.POST_VOTE_SUCCESS: {
      const { likeVoterIds, dislikeVoterIds } = action.payload
      return {
        ...state,
        likeVoterIds,
        dislikeVoterIds,
      }
    }
    case Type.POST_VOTE_FAILURE:
      return state
    default:
      return state
  }
}
