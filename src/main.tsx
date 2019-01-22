import { SFCExample } from '@/app/components/SFCExample'
import { ClassExample } from '@/app/containers/ClassExample'
import { configureStore } from '@/app/store'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import '@/assets/css/common.scss'
import diescakePng from '@/assets/images/diescake.png'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <SFCExample />
    <img src={diescakePng} />
    <ClassExample />
  </Provider>,
  document.getElementById('root')
)
