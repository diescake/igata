import { configure } from '@storybook/react'
// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.story\.(ts|tsx)$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
