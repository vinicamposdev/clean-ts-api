import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { IHttpResponse } from '@/presentation/protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbiden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error?: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error?.stack)
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})
