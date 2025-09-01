import { env } from '@/env'

export const REFRESH_TOKEN_EXPIRES_IN = '1d'
export const TOKEN_EXPIRES_IN = '12h'

export const COOKIE_CONFIG_REFRESH_TOKEN = {
  path: '/',
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 1, // 1 dias em segundos
} as const

export const COOKIE_CONFIG_TOKEN = {
  path: '/',
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  httpOnly: true,
  maxAge: 60 * 60 * 12, // 12 horas em segundos
} as const
