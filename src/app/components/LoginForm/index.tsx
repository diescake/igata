import React, { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
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
        <Form>
          <label className={style.label}>{login.id}</label>
          <ErrorMessage className={style.errorLabel} name="email" component="div" />
          <Field className={style.input} type="email" name="email" autoComplete="username" placeholder={login.idPlaceholder} />

          <label className={style.label}>{login.password}</label>
          <ErrorMessage className={style.errorLabel} name="password" component="div" />
          <Field
            className={style.input}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder={login.passwordPlaceholder}
          />

          <button type="submit" className={style.loginButton}>
            {login.login}
          </button>
        </Form>
      )
    }}
  </Formik>
)
