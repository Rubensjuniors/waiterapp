import { CookieOptions, Request, Response } from 'express'

import { IController } from '@/app/interfaces/controllers'

export function routeAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const file = req.file

    const { statusCode, body } = await controller.handle({
      body: req.body,
      file,
      headers: req.headers,
      cookies: req.cookies,
      setCookie: (name: string, val: string, options?: CookieOptions) => {
        if (options) {
          res.cookie(name, val, options)
        } else {
          res.cookie(name, val)
        }
      },
    })

    res.status(statusCode).json(body)
  }
}
