export const paths = {
  top: '/top',
  root: '/',
  login: '/login',
  user: '/user/id:',
  question: '/question/id:',
  questionCreate: '/question/create',
} as const

export type ScreenName = keyof typeof paths
