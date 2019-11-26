import '@/assets/css/reboot.css'
import '@/assets/css/common.scss'

import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'

// automatically import all files ending in *.stories.tsx
const req = require.context('@/app', true, /\.story\.(ts|tsx)$/)

function loadStories() {
  // NOTE: Probably, that type definition is wrong.
  addDecorator(withInfo as any)
  addDecorator(withKnobs)
  req.keys().forEach(req)
}

configure(loadStories, module)
