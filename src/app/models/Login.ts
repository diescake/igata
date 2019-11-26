export interface Session {
  readonly token: string
  readonly expiresAt: string
  readonly passwordSetAt: string
  readonly passwordExpiresAt: string
}

export interface LoginState {
  readonly id: string
  readonly email: string
  readonly createdAt: string
  readonly session: Session
}
