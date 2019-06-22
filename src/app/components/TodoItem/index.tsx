import React, { FC } from 'react'
import style from '@/app/components/TodoItem/style.scss'
import { Todo } from '@/app/models/Todo'

interface Props {
  readonly todo: Todo
  readonly handleCheckBoxClick: (todo: Todo) => void
}

export const TodoItem: FC<Props> = ({ todo, handleCheckBoxClick }: Props) => (
  <li className={style.list}>
    <input
      id={todo.id}
      className={style.checkbox}
      type="checkbox"
      onChange={handleCheckBoxClick.bind(null, todo)}
      checked={todo.done}
    />
    <label className={style.todoText} htmlFor={todo.id}>
      {todo.done ? <s>{todo.text}</s> : todo.text}
    </label>
  </li>
)
