import { Reducer } from 'redux'
import { Type, CommentAction } from '@/app/actions/comment'
import { CommentState } from '@/app/models/Comment'

const defaultState: CommentState = {
  id: '',
  userId: '',
  body: '',
  createdAt: '',
}

export const commentReducer: Reducer<CommentState, CommentAction> = (
  state: CommentState = defaultState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case Type.POST_COMMENT_QUESTION:
      return state
    case Type.POST_COMMENT_QUESTION_SUCCESS:
      return state
    case Type.POST_COMMENT_QUESTION_FAILURE:
      return state
    case Type.PUT_COMMENT_QUESTION:
      return state
    case Type.PUT_COMMENT_QUESTION_SUCCESS:
      return state
    case Type.PUT_COMMENT_QUESTION_FAILURE:
      return state
    case Type.POST_COMMENT_ANSWER:
      return state
    case Type.POST_COMMENT_ANSWER_SUCCESS:
      return state
    case Type.POST_COMMENT_ANSWER_FAILURE:
      return state
    case Type.PUT_COMMENT_ANSWER:
      return state
    case Type.PUT_COMMENT_ANSWER_SUCCESS:
      return state
    case Type.PUT_COMMENT_ANSWER_FAILURE:
      return state
    default:
      return state
  }
}
