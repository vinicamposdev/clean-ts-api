import { IHttpRequest, IHttpResponse } from '@/protocols/http'
import { MissingParamError } from '@/errors/missing-params-error'
import { badRequest } from '@/helpers/http-helpers'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: badRequest(new MissingParamError('email'))
      }
    }
  }
}
