import { Request, Response } from 'express'

import { IController } from '@/app/interfaces/controllers'

export function routeAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const file = req.file

    const { statusCode, body } = await controller.handle({
      body: req.body,
      file,
    })

    res.status(statusCode).json(body)
  }
}
