// Types
// export type Text = string

// Actions
export interface TodoAction {
  type: string
  text: string
}

// States
export interface Todo {
  done: boolean
  text: string
}

export interface TodoState {
  todos: Todo[]
}
