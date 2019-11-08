import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import style from '@/app/components/TodoItem/style.scss'
import { Todo } from '@/app/models/Todo'

interface Props {
  readonly todo: Todo
  readonly handleCheckBoxClick: (todo: Todo) => void
  readonly handleDeleteClick: (todo: Todo) => void
  readonly handleDetailClick: (todo: Todo) => void
}

export const TodoItem: FC<Props> = ({ todo, handleCheckBoxClick, handleDeleteClick, handleDetailClick }: Props) => (
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
    <button className={style.deleteButton} type="button" onClick={handleDeleteClick.bind(null, todo)}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
    <button className={style.detailButton} type="button" onClick={handleDetailClick.bind(null, todo)}>
      <FontAwesomeIcon icon={faArrowCircleRight} />
    </button>
  </li>
)
