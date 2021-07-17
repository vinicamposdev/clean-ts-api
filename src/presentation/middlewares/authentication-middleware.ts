import { ILoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { AccessDeniedError } from '@/presentation/errors'
import { forbiden } from '@/presentation/helpers/http/http-helpers'
import { IHttpRequest, IHttpResponse, IMiddleware } from '@/presentation/protocols'

export class AuthenticationMiddleware implements IMiddleware {
  constructor (
    private readonly loadAccountByToken: ILoadAccountByToken
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbiden(new AccessDeniedError())
  }
}
