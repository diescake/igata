import { ClassExample } from '@/app/components/ClassExample'
import { SFCExample } from '@/app/components/SFCExample'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import '@/assets/css/common.scss'
import diescakePng from '@/assets/images/diescake.png'

if (process.env.NODE_ENV !== 'production') {
  console.info('Build with development mode')
}

const root = document.getElementById('root')

ReactDOM.render(
  <>
    <SFCExample />
    <img src={diescakePng} />
    <ClassExample />
  </>,
  root
)
