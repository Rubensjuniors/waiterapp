import { sign } from 'jsonwebtoken'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/app/errors/InvalidCredentialsError'
import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeUserUseCase } from '@/app/useCases/UserUseCase/makeUser'
import { env } from '@/env'

import {
  COOKIE_CONFIG_REFRESH_TOKEN,
  COOKIE_CONFIG_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN,
  TOKEN_EXPIRES_IN,
} from '../constants'

const signInSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
})

export class SignInController implements IController {
  async handle({ body, setCookie }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = signInSchema.parse(body)

      const userUseCase = makeUserUseCase()

      const {
        user: { email: userEmail, id, name, urlCoverPhoto, createdAt },
      } = await userUseCase.authenticate({ email, password })

      const userData = {
        id,
        name,
        email: userEmail,
        createdAt,
        urlCoverPhoto: urlCoverPhoto ?? '',
      }

      const accessToken = sign(
        {
          sub: id,
          ...userData,
        },
        env.JWT_SECRET,
        {
          expiresIn: TOKEN_EXPIRES_IN,
        },
      )
      const refreshToken = sign(
        {
          sub: id,
          ...userData,
        },
        env.JWT_SECRET,
        {
          expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        },
      )

      setCookie('accessToken', accessToken, COOKIE_CONFIG_TOKEN)
      setCookie('refreshToken', refreshToken, COOKIE_CONFIG_REFRESH_TOKEN)

      return {
        statusCode: 201,
        body: {
          message: 'User created successfully',
          data: {
            accessToken,
          },
        },
      }
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return {
          statusCode: 401,
          body: {
            message: 'Invalid Token Error.',
          },
        }
      }

      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            message: error.issues,
          },
        }
      }

      console.error('Erro no SignUpController:', error)
      throw error
    }
  }
}
