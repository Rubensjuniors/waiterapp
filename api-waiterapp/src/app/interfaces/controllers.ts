import { IncomingHttpHeaders } from 'node:http'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequst {
  body?: Record<string, any>
  headers?: IncomingHttpHeaders
  accountId?: string | undefined
}

export interface IResponse {
  statusCode: 200 | number
  body: Record<string, any> | null
}

export interface IController {
  handle(request: IRequst): Promise<IResponse>
}
