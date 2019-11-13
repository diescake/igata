export interface Comment {
  readonly body: string
  readonly createdAt: string
  readonly id: string
  readonly userId: string
}

export interface Question {
  readonly body: string
  readonly comments: Comment[]
  readonly createdAt: string
  readonly dislikeVoterIds: string[]
  readonly id: string
  readonly likeVoterIds: string[]
  readonly title: string
  readonly userId: string
}

export interface QuestionState {
  readonly questions: Question[]
  readonly fetching: boolean
}
