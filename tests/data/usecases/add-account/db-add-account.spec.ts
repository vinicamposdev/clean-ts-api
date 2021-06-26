import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { IEncrypter } from '@/data/usecases/add-account/db-add-account-protocols'
interface SutTypes {
  sut: DbAddAccount
  encrypterStub: IEncrypter
}

const makeEcrypter = (): IEncrypter => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEcrypter()
  const sut = new DbAddAccount(encrypterStub)
  return {
    encrypterStub,
    sut
  }
}

describe('DbAddAccount Usecase', () => {
  test('Shoud call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const calledPassword = 'valid_password'

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: calledPassword
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(calledPassword)
  })

  test('Shoud throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const calledPassword = 'valid_password'

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: calledPassword
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
