import { Request, Response } from 'express'

import { IController } from '@/app/interfaces/controllers'

export function routeAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const { statusCode, body } = await controller.handle({ body: req.body })

    res.status(statusCode).json(body)
  }
}
