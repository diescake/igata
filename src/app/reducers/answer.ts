import { Reducer } from 'redux'
import { Type, AnswerAction } from '@/app/actions/answer'
import { AnswerState } from '@/app/models/Answer'

const defaultState: AnswerState = {
  answers: [],
  fetching: false,
  loading: false,
}

export const answerReducer: Reducer<AnswerState, AnswerAction> = (
  state: AnswerState = defaultState,
  action: AnswerAction
): AnswerState => {
  switch (action.type) {
    case Type.FETCH_ANSWERS:
      return {
        ...state,
        fetching: true,
      }

    case Type.FETCH_ANSWERS_SUCCESS:
      return { answers: action.payload.answers, fetching: false, loading: false }

    case Type.FETCH_ANSWERS_FAILURE:
      return {
        ...state,
        fetching: false,
        loading: false,
      }

    case Type.POST_ANSWER:
      return state

    case Type.POST_ANSWER_SUCCESS:
      return state

    case Type.POST_ANSWER_FAILURE:
      return state

    case Type.PUT_ANSWER:
      return state

    case Type.PUT_ANSWER_SUCCESS:
      return state

    case Type.PUT_ANSWER_FAILURE:
      return state

    case Type.LOADING_ANSWER:
      return { ...state, loading: true }
    default:
      return state
  }
}
