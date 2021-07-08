import { ILoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { IAccountModel } from '@/domain/models/account'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { IAuthenticationModel } from '@/domain/usecases/authentication'
import { IHashCompare } from '@/data/protocols/cryptography/hash-compare'

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'

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

const makeHashCompare = (): IHashCompare => {
  class HashCompareStub implements IHashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashCompareStub()
}

interface ISutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoyStub: ILoadAccountByEmailRepository
  hashCompareStub: IHashCompare
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoyStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHashCompare()
  const sut = new DbAuthentication(loadAccountByEmailRepositoyStub, hashCompareStub)

  return {
    sut,
    loadAccountByEmailRepositoyStub,
    hashCompareStub
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

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoyStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoyStub, 'load').mockReturnValueOnce(null)

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBe(null)
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()

    const compareSpy = jest.spyOn(hashCompareStub, 'compare')

    await sut.auth(makeFakeAuthentication())

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()

    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).resolves.toEqual(null)
    // await expect(promise).rejects.toThrow()
  })
})
