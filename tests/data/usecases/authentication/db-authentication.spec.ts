import { ILoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
import { IAccountModel } from '@/domain/models/account'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { IAuthenticationModel } from '@/domain/usecases/authentication'

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'

})

const makeFakeAuthentication = (): IAuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'

})

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async load (email: string): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface ISutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoyStub: ILoadAccountByEmailRepository
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoyStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoyStub)

  return {
    sut,
    loadAccountByEmailRepositoyStub
  }
}

describe('DbAuthentication UseCase', () => {
  // integration between components
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoyStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoyStub, 'load')

    await sut.auth(makeFakeAuthentication())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoyStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoyStub, 'load').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })
})
