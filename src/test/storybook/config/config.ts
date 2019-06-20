import '@/assets/css/reboot.css'
import '@/assets/css/common.scss'

import '@storybook/addon-a11y/register'
import '@storybook/addon-actions/register'
import '@storybook/addon-knobs/register'
import '@storybook/addon-links/register'
import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.story\.(ts|tsx)$/)

function loadStories() {
  addDecorator(withInfo)
  addDecorator(withKnobs)
  req.keys().forEach(req)
}

configure(loadStories, module)
