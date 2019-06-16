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
