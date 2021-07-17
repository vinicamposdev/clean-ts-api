import { forbiden } from '@/presentation/helpers/http/http-helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication-middleware'
import { ILoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { IAccountModel } from '@/domain/models/account'

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountByTokenStub = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByTokenStub()
}

interface ISutTypes {
  loadAccountByTokenStub: ILoadAccountByToken
  sut: AuthenticationMiddleware
}

const makeSut = (): ISutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthenticationMiddleware(loadAccountByTokenStub)

  return {
    loadAccountByTokenStub,
    sut
  }
}
describe('Authentication Middleware', () => {
  test('Should return 403 if no x-access-token existis in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()))
  })
  // Ensure that Authentication Middleware is calling the Dependency on the right way
  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })

    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
