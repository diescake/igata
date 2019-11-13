import { Reducer } from 'redux'
import { Type, AnswerAction } from '@/app/actions/answer'
import { AnswerState, Answer } from '@/app/models/Answer'

const defaultState: AnswerState = {
  answers: [],
  fetching: false,
}

export const answerReducer: Reducer<AnswerState, AnswerAction> = (
  state: AnswerState = defaultState,
  action: AnswerAction
): AnswerState => {
  switch (action.type) {
    case Type.ADD_ANSWER: {
      return state
    }

    case Type.UPDATE_ANSWER: {
      if (state.fetching) {
        return state
      }

      const index = state.answers.findIndex((answer: Answer) => answer.id === action.payload.id)
      if (index === -1) {
        return state
      }

      return { ...state, answers: Object.assign([...state.answers], { [index]: action.payload }) }
    }

    case Type.DELETE_ANSWER:
      if (state.fetching) {
        return state
      }

      return {
        ...state,
        answers: state.answers.filter(answer => answer.id !== action.payload),
      }

    case Type.FETCH_ANSWERS:
      return {
        ...state,
        fetching: true,
      }

    case Type.FETCH_ANSWERS_SUCCESS:
      return { answers: action.payload.answers, fetching: false }

    case Type.FETCH_ANSWERS_FAILURE:
      return {
        ...state,
        fetching: false,
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
    default:
      return state
  }
}
