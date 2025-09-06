/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingHttpHeaders } from 'node:http'

import { CookieOptions } from 'express'

export interface IRequest {
  body: Record<string, any>
  headers: IncomingHttpHeaders
  params: Record<string, any>
  query: Record<string, any>
  accountId?: string | undefined
  file?: Express.Multer.File
  setCookie: (name: string, val: string, options?: CookieOptions) => void
  cookies: Record<string, string>
}

export interface IResponse {
  statusCode: 200 | number
  body: Record<string, any> | null
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>
}
