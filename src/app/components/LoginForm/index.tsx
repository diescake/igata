import React, { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import clsx from 'clsx'

import { LoginDispatcher } from '@/app/actions/login'
import words from '@/assets/strings'
import style from '@/app/components/LoginForm/style.scss'
import { isValidEmail, isValidPassword } from '@/app/common/utils'

interface Props {
  readonly login: LoginDispatcher['login']
}

const validateEmail = (email: string) => {
  if (!email) {
    return words.login.idErrorEmpty
  }
  if (!isValidEmail(email)) {
    return words.login.idErrorInvalid
  }
  return ''
}

const validatePassword = (password: string) => {
  if (!password) {
    return words.login.passwordErrorEmpty
  }
  if (!isValidPassword(password)) {
    return words.login.passwordErrorInvalid
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
    enableReinitialize
  >
    {() => {
      const { login } = words

      return (
        <Form className={style.main}>
          <div className={clsx(style.marginLeft)}>
            <label className={clsx(style.label)}>{login.id}</label>
            <ErrorMessage className={clsx(style.errorLabel)} name="email" component="div" />
            <Field
              className={clsx(style.input)}
              type="email"
              name="email"
              autoComplete="username"
              placeholder={login.idPlaceholder}
            />

            <label className={clsx(style.label)}>{login.password}</label>
            <ErrorMessage className={style.errorLabel} name="password" component="div" />
            <Field
              className={clsx(style.input)}
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder={login.passwordPlaceholder}
            />

            <button type="submit" className={clsx(style.loginButton)}>
              {login.login}
            </button>
          </div>
        </Form>
      )
    }}
  </Formik>
)
