export interface Todo {
  readonly id: string
  readonly done: boolean
  readonly text: string
}

export interface TodoState {
  readonly todos: Todo[]
  readonly fetching: boolean
}
