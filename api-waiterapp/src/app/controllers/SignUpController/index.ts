import { z } from 'zod'

import { EmailAlreadyRegisteredError } from '@/app/errors/EmailAlreadyRegisteredError'
import { IController, IRequst, IResponse } from '@/app/interfaces/controllers'
import { UserRole } from '@/app/models/User/types'
import { makeUserUseCase } from '@/app/useCases/UserUseCase/makeUser'

const signUpSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  role: z.nativeEnum(UserRole).default(UserRole.COMMON),
  urlCoverPhoto: z.string().url().optional(),
})

export class SignUpController implements IController {
  async handle({ body }: IRequst): Promise<IResponse> {
    try {
      const validatedData = signUpSchema.parse(body)

      const userUseCase = makeUserUseCase()

      const result = await userUseCase.registerUser({
        ...validatedData,
        createdAt: new Date(),
      })

      return {
        statusCode: 201,
        body: {
          message: 'User created successfully',
          data: result.user,
        },
      }
    } catch (error) {
      if (error instanceof EmailAlreadyRegisteredError) {
        return {
          statusCode: 409,
          body: {
            message: 'E-mail already registered.',
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
