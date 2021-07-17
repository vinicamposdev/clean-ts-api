import { AccessDeniedError } from '@/presentation/errors'
import { forbiden } from '@/presentation/helpers/http/http-helpers'
import { IHttpRequest, IHttpResponse, IMiddleware } from '@/presentation/protocols'

export class AuthenticationMiddleware implements IMiddleware {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await new Promise(resolve => resolve(forbiden(new AccessDeniedError())))
  }
}
