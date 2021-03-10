import { IHttpRequest, IHttpResponse } from '@/protocols/http'
import { MissingParamError } from '@/errors/missing-params-error'
import { badRequest } from '@/helpers/http-helpers'
import { IController } from '@/protocols/controller'
import { IEmailValidator } from '@/protocols/email-validator'
import { InvalidParamError } from '@/errors/invalid-param-error copy'
export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator

  constructor (emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = ['name', 'email', 'password', 'password_confirmation']
    for (const requiredField of requiredFields) {
      if (!httpRequest.body[requiredField]) {
        return badRequest(new MissingParamError(requiredField))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
