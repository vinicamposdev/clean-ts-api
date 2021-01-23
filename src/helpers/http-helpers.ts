import { IHttpResponse } from '@/protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})
