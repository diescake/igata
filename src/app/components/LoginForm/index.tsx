import React, { FC } from 'react'
import { Formik } from 'formik'
import { DispatchLogin } from '@/app/actions/login'

import words from '@/assets/strings'
import style from '@/app/components/LoginForm/style.scss'

interface Props {
  readonly login: DispatchLogin
}

const validateEmail = (email: string) => {
  if (!email) {
    return words.login.idErrorEmpty
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return words.login.idErrorInvalid
  }
  return ''
}

const validatePassword = (password: string) => {
  if (!password) {
    return words.login.passwordErrorEmpty
  }
  return ''
}

export const LoginForm: FC<Props> = (props: Props) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={values => {
      const email = validateEmail(values.email)
      const password = validatePassword(values.password)
      return email || password ? { email, password } : {}
    }}
    onSubmit={values => props.login(values.email, values.password)}
    validateOnBlur
  >
    {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
      const { login } = words

      return (
        <form onSubmit={handleSubmit}>
          <label className={style.label}>{login.id}</label>
          <label className={style.errorLabel}>{errors.email}</label>
          <input
            className={style.input}
            type="email"
            name="email"
            autoComplete="username"
            onChange={handleChange}
            placeholder={login.idPlaceholder}
            onBlur={handleBlur}
            value={values.email}
          />
          <label className={style.label}>{login.password}</label>
          <label className={style.errorLabel}>{errors.password}</label>
          <input
            className={style.input}
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            placeholder={login.passwordPlaceholder}
            onBlur={handleBlur}
            value={values.password}
          />
          <button type="submit" className={style.loginButton}>
            {login.login}
          </button>
        </form>
      )
    }}
  </Formik>
)
