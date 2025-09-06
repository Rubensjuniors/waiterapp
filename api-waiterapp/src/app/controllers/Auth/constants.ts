import { env } from '@/env'

export const REFRESH_TOKEN_EXPIRES_IN = '1d'
export const TOKEN_EXPIRES_IN = '12h'

export const COOKIE_CONFIG_REFRESH_TOKEN = {
  path: '/',
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 1 * 1000, // 1 dia em milissegundos
} as const

export const COOKIE_CONFIG_TOKEN = {
  path: '/',
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  httpOnly: true,
  maxAge: 60 * 60 * 12 * 1000, // 12 horas em milissegundos
} as const
