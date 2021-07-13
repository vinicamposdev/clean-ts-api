import { IHttpRequest, IHttpResponse, IController, IAddAccount } from './signup-controller-protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helpers'
import { IValidation } from '@/presentation/protocols/validation'
import { IAuthentication } from '@/domain/usecases/authentication'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      await this.addAccount.add({
        name,
        email,
        password
      })

      const accessToken = await this.authentication.auth({ email, password })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
