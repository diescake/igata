export const paths = {
  root: '/',
  login: '/login',
} as const

export type ScreenName = keyof typeof paths
