export const paths = {
  root: '/',
  login: '/login',
  detail: '/detail',
} as const

export type ScreenName = keyof typeof paths
