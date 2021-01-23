import { IHttpRequest, IHttpResponse } from '@/protocols/http'
import { MissingParamError } from '@/errors/missing-params-error'
import { badRequest } from '@/helpers/http-helpers'
import { IController } from '@/protocols/controller'
export class SignUpController implements IController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const requiredField of requiredFields) {
      if (!httpRequest.body[requiredField]) {
        return badRequest(new MissingParamError(requiredField))
      }
    }
  }
}
