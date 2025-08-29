import { sign, verify } from 'jsonwebtoken'

import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { env } from '@/env'

import {
  COOKIE_CONFIG_REFRESH_TOKEN,
  COOKIE_CONFIG_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN,
  TOKEN_EXPIRES_IN,
} from '../constants'

export class RefreshTokenController implements IController {
  async handle({ cookies, setCookie }: IRequest): Promise<IResponse> {
    try {
      const refreshTokenCookie = cookies?.refreshToken

      if (!refreshTokenCookie) {
        return {
          statusCode: 401,
          body: {
            message: 'Refresh token não encontrado',
          },
        }
      }

      const decoded = verify(refreshTokenCookie, env.JWT_SECRET) as {
        sub: string
        id: string
        name: string
        email: string
        createdAt: string
        urlCoverPhoto?: string
        iat?: number
        exp?: number
      }

      const userData = {
        sub: decoded.sub,
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        createdAt: decoded.createdAt,
        urlCoverPhoto: decoded.urlCoverPhoto ?? '',
      }

      const accessToken = sign(userData, env.JWT_SECRET, {
        expiresIn: TOKEN_EXPIRES_IN,
      })
      const refreshToken = sign(userData, env.JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      })

      setCookie('accessToken', accessToken, COOKIE_CONFIG_TOKEN)
      setCookie('refreshToken', refreshToken, COOKIE_CONFIG_REFRESH_TOKEN)

      return {
        statusCode: 200,
        body: {
          message: 'Refresh token válido',
          data: {
            accessToken,
          },
        },
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'JsonWebTokenError') {
        return {
          statusCode: 401,
          body: {
            message: 'Token inválido',
          },
        }
      }

      if (error instanceof Error && error.name === 'TokenExpiredError') {
        return {
          statusCode: 401,
          body: {
            message: 'Token expirado',
          },
        }
      }

      console.error('Erro no RefreshTokenController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Erro interno do servidor',
        },
      }
    }
  }
}
