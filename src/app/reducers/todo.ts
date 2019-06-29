import { Reducer } from 'redux'
import uuid from 'uuidv4'
import { TodoAction, Type } from '@/app/actions/todo'
import { TodoState, Todo } from '@/app/models/Todo'

const defaultState: TodoState = {
  todos: [],
  fetching: false,
}

export const todoReducer: Reducer<TodoState, TodoAction> = (state: TodoState = defaultState, action: TodoAction): TodoState => {
  switch (action.type) {
    case Type.ADD_TODO: {
      if (state.fetching) {
        return state
      }

      const newTodo = {
        id: uuid(),
        done: false,
        text: action.payload.text,
      }

      return { ...state, todos: [...state.todos, newTodo] }
    }

    case Type.UPDATE_TODO: {
      if (state.fetching) {
        return state
      }

      const index = state.todos.findIndex((todo: Todo) => todo.id === action.payload.id)
      if (index === -1) {
        return state
      }

      return { ...state, todos: Object.assign([...state.todos], { [index]: action.payload }) }
    }

    case Type.DELETE_TODO:
      if (state.fetching) {
        return state
      }

      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      }

    case Type.FETCH_TODOS:
      return {
        ...state,
        fetching: true,
      }

    case Type.FETCH_TODOS_SUCCESS:
      return { todos: action.payload.todos, fetching: false }

    case Type.FETCH_TODOS_FAILURE:
      return {
        ...state,
        fetching: false,
      }

    default:
      return state
  }
}
