// Types
// export type Text = string

// Actions
export interface TodoAction {
  type: string
  text: string
}

// States
export interface TodoState {
  texts: string[]
}

export interface RootState {
  todos: TodoState
}
