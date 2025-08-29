export const REFRESH_TOKEN_EXPIRES_IN = '1d'
export const TOKEN_EXPIRES_IN = '1m'

export const COOKIE_CONFIG_REFRESH_TOKEN = {
  path: '/',
  secure: true,
  sameSite: 'strict',
  httpOnly: true,
  maxAge: 60 * 60 * 24, // 1 dia em segundos
} as const

export const COOKIE_CONFIG_TOKEN = {
  path: '/',
  secure: true,
  sameSite: 'strict',
  httpOnly: true,
  maxAge: 60 * 60 * 12, // 12H em segundos
} as const
