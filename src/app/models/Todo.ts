export interface Todo {
  readonly done: boolean
  readonly text: string
}

export interface TodoState {
  readonly todos: Todo[]
}
