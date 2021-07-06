import { IHttpRequest, IHttpResponse, IController, IEmailValidator, IAddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/http-helpers'
import { IValidation } from '@/presentation/helpers/validators/validators'

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly addAccount: IAddAccount
  private readonly validation: IValidation

  constructor (emailValidator: IEmailValidator, addAccount: IAddAccount, validation: IValidation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const requiredField of requiredFields) {
        if (!httpRequest.body[requiredField]) {
          return badRequest(new MissingParamError(requiredField))
        }
      }

      const { name, email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
