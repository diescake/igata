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
  isFetching: false,
  isLoading: false,
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
        isFetching: true,
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
        isFetching: false,
        isLoading: false,
      }
    case Type.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoading: false,
      }

    // 単体
    case Type.FETCH_QUESTION:
      return {
        ...state,
        isFetching: true,
        isLoading: action.payload.isLoading ? action.payload.isLoading : false,
      }
    case Type.FETCH_QUESTION_SUCCESS:
      return { questions: [], question: action.payload.question, isFetching: false, isLoading: false }

    case Type.FETCH_QUESTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoading: false,
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
        isFetching: state.isFetching,
        isLoading: state.isLoading,
      }
    case Type.POST_QUESTION_FAILURE:
      return {
        ...state,
        isFetching: state.isFetching,
        isLoading: state.isLoading,
      }

    // Put
    case Type.PUT_QUESTION:
      return state
    case Type.PUT_QUESTION_SUCCESS:
      return { questions: [], question: action.payload.question, isFetching: state.isFetching, isLoading: state.isLoading }
    case Type.PUT_QUESTION_FAILURE:
      return {
        ...state,
        isFetching: state.isFetching,
      }

    default:
      return state
  }
}
