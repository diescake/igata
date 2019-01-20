import '@/assets/css/common.scss'
import diescakePng from '@/assets/images/diescake.png'

if (process.env.NODE_ENV !== 'production') {
  console.warn('Build with development mode')
}

const multiply = (num: number, multi: number): number => {
  return num * multi
}

const imageElem = document.createElement('img')
imageElem.setAttribute('src', diescakePng)

document.body.appendChild(imageElem)

const DUMMY_NUM = 123
const DUMMY_MULTI = 2

console.log(multiply(DUMMY_NUM, DUMMY_MULTI))
