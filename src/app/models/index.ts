import { RouterState } from 'connected-react-router'
import { VoteState } from '@/app/models/Vote'
import { NetworkState } from '@/app/models/Network'
import { LoginState } from '@/app/models/Login'
import { QuestionState } from '@/app/models/Question'
import { AnswerState } from '@/app/models/Answer'
import { CommentState } from '@/app/models/Comment'

export interface RootState {
  readonly router: RouterState
  readonly networkState: NetworkState
  readonly loginState: LoginState
  readonly questionState: QuestionState
  readonly answerState: AnswerState
  readonly commentState: CommentState
  readonly voteState: VoteState
}
