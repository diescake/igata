export const paths = {
  root: '/',
  login: '/login',
  user: '/user/',
  question: '/question/',
  questionCreate: '/question/create',
} as const

export type ScreenName = keyof typeof paths
