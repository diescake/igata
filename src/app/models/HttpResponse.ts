export interface LoginResponse {
  readonly token: string
  readonly user_id: string
}

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

export interface QuestionsCreateResponse {
  readonly title: string
  readonly body: string
}
