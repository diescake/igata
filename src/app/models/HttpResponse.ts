// ログイン
export interface Session {
  readonly key: string
  readonly expires_at: string
  readonly password_set_at: string
  readonly password_expires_at: string
}

export interface LoginResponse {
  readonly token: string
  readonly user_id: string
  readonly id: string
  readonly email: string
  readonly created_at: string
  readonly session: Session
  readonly key: string
  readonly expires_at: string
}

// Questionレスポンス
export interface Comment {
  readonly body: string
  readonly created_at: string
  readonly id: string
  readonly user_id: string
}
export interface Question {
  readonly body: string
  readonly comments: Comment[]
  readonly created_at: string
  readonly dislike_voter_ids: string[]
  readonly id: string
  readonly like_voter_ids: string[]
  readonly title: string
  readonly user_id: string
}
export interface QuestionsResponse {
  readonly questions: Question[]
}

export interface QuestionCreateResponse {
  readonly title: string
  readonly body: string
}

// Answerレスポンス
export interface Answer {
  readonly id: string
  readonly body: string
  readonly question_id: string
  readonly user_id: string
  readonly created_at: string
  readonly comments: Comment[]
}

export interface AnswerState {
  readonly answers: Answer[]
  readonly fetching: boolean
}

export interface AnswersResponse {
  readonly questions: Question[]
}

export interface AnswerCreateResponse {
  readonly body: string
  readonly question_id: string
}

export interface AnswerUpdateResponse {
  readonly body: string
}

export interface CommentState {
  readonly id: string
  readonly user_id: string
  readonly body: string
  readonly created_at: string
}

export interface VoteState {
  readonly like_voter_ids: string[]
  readonly dislike_voter_ids: string[]
}
