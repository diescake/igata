export const paths = {
  root: '/',
  login: '/login',
  user: '/user/',
  userId: '/user/:userId',
  question: '/question/',
  questionId: '/question/:id', // FIXME: !!
  // alertsAlertId: (alertId = ':alertId') => `/alerts/${alertId}`,
  answer: '/answer/',
  comment: '/comment',
  questionCreate: '/question/create',
  authenticatedSample: '/authenticated/sample',
  vote: '/vote',
  query: '?',
  addPath: (id: string) => `/${id}`,
} as const

export type ScreenName = keyof typeof paths
