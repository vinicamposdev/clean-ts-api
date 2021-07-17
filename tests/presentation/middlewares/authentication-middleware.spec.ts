import { forbiden } from '@/presentation/helpers/http/http-helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication-middleware'

describe('Authentication Middleware', () => {
  test('Should return 403 if no x-access-token existis in headers', async () => {
    const sut = new AuthenticationMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()))
  })
})
