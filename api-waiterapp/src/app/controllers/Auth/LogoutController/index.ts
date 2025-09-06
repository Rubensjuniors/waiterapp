import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'

export class LogoutController implements IController {
  async handle({ setCookie }: IRequest): Promise<IResponse> {
    setCookie('accessToken', '', {
      maxAge: 0,
      path: '/',
    })
    setCookie('refreshToken', '', {
      maxAge: 0,
      path: '/',
    })
    return {
      statusCode: 200,
      body: {
        message: 'Logout successful',
      },
    }
  }
}
