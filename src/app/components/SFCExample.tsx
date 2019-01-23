import diescakePng from '@/assets/images/diescake.png'
import * as React from 'react'
import { Footer } from './Footer'

export namespace SFCExample {
  export interface Props {}
  export interface State {}
}

export default () => (
  <>
    <h1>Hello from TypeScript and framework!!!</h1>
    <img src={diescakePng} />
    <Footer />
  </>
)
