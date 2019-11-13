export interface Comment {
  readonly id: string
  readonly userId: string
  readonly createdAt: string
  readonly body: string
}

export interface Answer {
  readonly id: string
  readonly body: string
  readonly questionId: string
  readonly userId: string
  readonly createdAt: string
  readonly comments: Comment[]
}

export interface AnswerState {
  readonly answers: Answer[]
  readonly fetching: boolean
}
