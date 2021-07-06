import { badRequest, serverError } from '@/presentation/helpers/http-helpers'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { IAuthentication } from '@/domain/usecases/authentication'

export class LoginController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly authentication: IAuthentication

  constructor (emailValidator: IEmailValidator, authentication: IAuthentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) { return await new Promise(resolve => resolve(badRequest(new MissingParamError('email')))) }
      if (!password) { return await new Promise(resolve => resolve(badRequest(new MissingParamError('password')))) }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) { return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email')))) }
      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
