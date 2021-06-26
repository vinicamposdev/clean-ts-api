import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Shoud call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
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
