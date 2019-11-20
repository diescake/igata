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
  addPath: (id: string) => `/${id}`,
} as const

export type ScreenName = keyof typeof paths
