import SFCExample from '@/app/components/SFCExample'
import ClassExample from '@/app/containers/ClassExample'
import { configureStore } from '@/app/store'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'

import '@/assets/css/common.scss'
import diescakePng from '@/assets/images/diescake.png'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const history = createBrowserHistory()
const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <img src={diescakePng} />
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={ClassExample} />
        <Route exact path="/sfc" component={SFCExample} />
        <Redirect to="/" />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
