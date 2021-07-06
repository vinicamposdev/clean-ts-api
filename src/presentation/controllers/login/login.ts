import { badRequest } from '@/presentation/helpers/http-helpers'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { IEmailValidator } from '@/presentation/protocols/email-validator'

export class LoginController implements IController {
  private readonly emailValidator: IEmailValidator

  constructor (emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) { return await new Promise(resolve => resolve(badRequest(new MissingParamError('email')))) }
    if (!httpRequest.body.password) { return await new Promise(resolve => resolve(badRequest(new MissingParamError('password')))) }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) { return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email')))) }
  }
}
