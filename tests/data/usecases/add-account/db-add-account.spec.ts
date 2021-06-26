import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { IEncrypter, IAccountModel, IAddAccountModel, IAddAccountRepository } from '@/data/usecases/add-account/db-add-account-protocols'

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

interface ISutTypes {
  sut: DbAddAccount
  encrypterStub: IEncrypter
  addAccountRepositoryStub: IAddAccountRepository
}

const makeSut = (): ISutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    addAccountRepositoryStub,
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
  // Ensure integration between components
  test('Shoud call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({ ...accountData, password: 'hashed_password' })
  })

  test('Shoud throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
