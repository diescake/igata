import { Reducer } from 'redux'
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
  loading: false,
}

export const questionReducer: Reducer<QuestionState, QuestionAction> = (
  state: QuestionState = defaultState,
  action: QuestionAction
): QuestionState => {
  switch (action.type) {
    // 複数
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
        loading: false,
      }
    case Type.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        fetching: false,
        loading: false,
      }

    // 単体
    case Type.FETCH_QUESTION:
      return {
        ...state,
        fetching: true,
      }
    case Type.FETCH_QUESTION_SUCCESS:
      return { questions: [], question: action.payload.question, fetching: false, loading: false }

    case Type.FETCH_QUESTION_FAILURE:
      return {
        ...state,
        fetching: false,
        loading: false,
      }

    // Post
    case Type.POST_QUESTION:
      return state
    case Type.POST_QUESTION_SUCCESS:
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
        fetching: state.fetching,
        loading: state.loading,
      }
    case Type.POST_QUESTION_FAILURE:
      return {
        ...state,
        fetching: state.fetching,
        loading: state.loading,
      }

    // Put
    case Type.PUT_QUESTION:
      return state
    case Type.PUT_QUESTION_SUCCESS:
      return { questions: [], question: action.payload.question, fetching: state.fetching, loading: state.loading }
    case Type.PUT_QUESTION_FAILURE:
      return {
        ...state,
        fetching: state.fetching,
      }

    case Type.LOADING_QUESTION:
      return { ...state, loading: true }
    default:
      return state
  }
}
