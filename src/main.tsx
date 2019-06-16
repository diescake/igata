import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import Login from '@/app/containers/Login'
import TodoApp from '@/app/containers/TodoApp'
import { configureStore } from '@/app/store'
import { Authenticated } from '@/app/helpers/Authenticated'
import '@/assets/css/reboot.css'
import '@/assets/css/common.scss'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const history = createBrowserHistory()
const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Authenticated>
          <Route exact path="/" component={TodoApp} />
        </Authenticated>
        {/* FIXME: Following "Not Found" is unreachable and doesn't work. */}
        <Route render={() => <h1>404 Not Found</h1>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
