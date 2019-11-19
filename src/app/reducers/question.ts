import { Reducer } from 'redux'
import { paths } from '@/app/common/paths'
import { Type, QuestionAction } from '@/app/actions/question'
import { QuestionState } from '@/app/models/Question'

const defaultState: QuestionState = {
  questions: [],
  question: {
    body: '',
    comments: [],
    createdAt: '',
    dislikeVoterIds: [],
    id: '',
    likeVoterIds: [],
    title: '',
    userId: '',
  },
  fetching: false,
}

export const questionReducer: Reducer<QuestionState, QuestionAction> = (
  state: QuestionState = defaultState,
  action: QuestionAction
): QuestionState => {
  switch (action.type) {
    case Type.FETCH_QUESTIONS:
      return {
        ...state,
        fetching: true,
      }

    case Type.FETCH_QUESTIONS_SUCCESS:
      return {
        questions: action.payload.questions,
        question: {
          body: '',
          comments: [],
          createdAt: '',
          dislikeVoterIds: [],
          id: '',
          likeVoterIds: [],
          title: '',
          userId: '',
        },
        fetching: false,
      }

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
      return { questions: [], question: action.payload.question, fetching: false }

    case Type.FETCH_QUESTION_FAILURE:
      return {
        ...state,
        fetching: false,
      }

    case Type.POST_QUESTION:
      return state

    case Type.POST_QUESTION_SUCCESS:
      window.location.href = paths.root
      return state

    case Type.POST_QUESTION_FAILURE:
      return state

    default:
      return state
  }
}