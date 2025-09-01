import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'

export class LogoutController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    request.setCookie('token', '', {
      maxAge: 0,
      path: '/',
    })
    request.setCookie('refreshToken', '', {
      maxAge: 0,
      path: '/',
    })
    return {
      statusCode: 201,
      body: {
        message: 'Logout successful',
      },
    }
  }
}
