import { IncomingHttpHeaders } from 'node:http'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequest {
  body?: Record<string, any>
  headers?: IncomingHttpHeaders
  accountId?: string | undefined
  file?: Express.Multer.File
}

export interface IResponse {
  statusCode: 200 | number
  body: Record<string, any> | null
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>
}
