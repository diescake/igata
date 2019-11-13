// ログイン
export interface LoginResponse {
  readonly token: string
  readonly user_id: string
}

// TODO
interface Todo {
  readonly id: string
  readonly done: boolean
  readonly text: string
}

export interface TodosResponse {
  readonly todos: Todo[]
}

// Questionレスポンス
export interface Comment {
  readonly body: string
  readonly created_at: string
  readonly id: string
  readonly userId: string
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
