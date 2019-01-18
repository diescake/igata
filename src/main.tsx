import '@/assets/css/common.scss'
import image from '@/assets/images/diescake.png'

if (process.env.NODE_ENV !== 'production') {
  console.warn('Build with development mode')
}

const multiply = (num: number): number => {
  return num * 2
}

const imageElem = document.createElement('img')
imageElem.setAttribute('src', image)

document.body.appendChild(imageElem)

console.log(multiply(123))
