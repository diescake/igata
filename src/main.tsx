import image from '@/assets/images/diescake.png'
import '@/assets/css/common.css'

if (process.env.NODE_ENV !== 'production') {
  console.warn('Build with development mode')
}

const imageElem = document.createElement('img')
imageElem.setAttribute('src', image);

document.body.appendChild(imageElem)
