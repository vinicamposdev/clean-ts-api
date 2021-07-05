import { ServerError } from '@/presentation/errors'
import { IHttpResponse } from '@/presentation/protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
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
