import { badRequest } from '@/presentation/helpers/http-helpers'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'

export class LoginController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
  }
}
