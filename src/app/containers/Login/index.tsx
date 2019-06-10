import { login, Login } from '@/app/actions/login'
import { RootState } from '@/app/models'
import words from '@/assets/strings'
import { History } from 'history'
import * as React from 'react'
import { connect } from 'react-redux'
import style from '@/app/containers/Login/style.scss'

interface Props {
  readonly token: string
  readonly login: Login
  readonly history: History
}
interface State {
  readonly currentId: string
  readonly currentPassword: string
}

const mapStateToProps = (state: RootState) => ({
  token: state.loginState.token,
})

const mapDispatchToProps = {
  login,
}

class LoginApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentId: '',
      currentPassword: '',
    }
  }

  static getDerivedStateFromProps = (nextProps: Props) => {
    if (nextProps.token) {
      nextProps.history.push('/')
    }

    return null
  }

  handleLogin = () => this.props.login(this.state.currentId, this.state.currentPassword)

  handleLoginIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      currentId: e.target.value,
    })

  handleLoginPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      currentPassword: e.target.value,
    })

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return
    }
    this.handleLogin()
  }

  render = () => (
    <div className={style.container}>
      <h1 className={style.header}>{words.login.title}</h1>
      <div>
        <input
          className={style.inputId}
          type="text"
          onChange={this.handleLoginIdChange}
          onKeyPress={this.handleKeyPress}
          placeholder={words.login.idPlaceholder}
          value={this.state.currentId}
        />
      </div>
      <div>
        <input
          className={style.inputPassword}
          type="password"
          onChange={this.handleLoginPasswordChange}
          onKeyPress={this.handleKeyPress}
          placeholder={words.login.passwordPlaceholder}
          value={this.state.currentPassword}
        />
      </div>
      <button type="button" className={style.loginButton} onClick={this.handleLogin}>
        {words.todoApp.login}
      </button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginApp)
