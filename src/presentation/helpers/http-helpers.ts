import { ServerError } from '@/presentation/errors/server-error'
import { IHttpResponse } from '@/presentation/protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
