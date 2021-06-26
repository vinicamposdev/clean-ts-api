import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { IEncrypter } from '@/data/protocols/encrypter'
interface SutTypes {
  sut: DbAddAccount
  encrypterStub: IEncrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  const encrypterStub = new EncrypterStub()
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
})
