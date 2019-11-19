export const paths = {
  root: '/',
  login: '/login',
  user: '/user/',
  userId: '/user/:userId',
  question: '/question/',
  questionId: '/question/:id',
  answer: '/answer/',
  comment: '/comment',
  questionCreate: '/question/create',
  query: '?',
} as const

export type ScreenName = keyof typeof paths
