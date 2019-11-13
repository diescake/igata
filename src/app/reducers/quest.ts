import { Reducer } from 'redux'
import { Type, QuestionAction } from '@/app/actions/question'
import { QuestionState, Question } from '@/app/models/Question'

const defaultState: QuestionState = {
  questions: [],
  fetching: false,
}

export const questionReducer: Reducer<QuestionState, QuestionAction> = (
  state: QuestionState = defaultState,
  action: QuestionAction
): QuestionState => {
  switch (action.type) {
    case Type.ADD_QUESTION: {
      return state
    }

    case Type.UPDATE_QUESTION: {
      if (state.fetching) {
        return state
      }

      const index = state.questions.findIndex((question: Question) => question.id === action.payload.id)
      if (index === -1) {
        return state
      }

      return { ...state, questions: Object.assign([...state.questions], { [index]: action.payload }) }
    }

    case Type.DELETE_QUESTION:
      if (state.fetching) {
        return state
      }

      return {
        ...state,
        questions: state.questions.filter(question => question.id !== action.payload),
      }

    case Type.FETCH_QUESTIONS:
      return {
        ...state,
        fetching: true,
      }

    case Type.FETCH_QUESTIONS_SUCCESS:
      return { questions: action.payload.questions, fetching: false }

    case Type.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        fetching: false,
      }
    case Type.FETCH_QUESTION:
      return {
        ...state,
        fetching: true,
      }

    case Type.FETCH_QUESTION_SUCCESS:
      return state
    // return { question: action.payload.question, fetching: false }

    case Type.FETCH_QUESTION_FAILURE:
      return {
        ...state,
        fetching: false,
      }

    case Type.POST_QUESTION:
      return state

    case Type.POST_QUESTION_SUCCESS:
      return state

    case Type.POST_QUESTION_FAILURE:
      // えらーぶんが必要かも
      return state

    default:
      return state
  }
}
