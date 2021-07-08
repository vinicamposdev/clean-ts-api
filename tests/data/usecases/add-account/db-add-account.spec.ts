import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { IHasher, IAccountModel, IAddAccountModel, IAddAccountRepository } from '@/data/usecases/add-account/db-add-account-protocols'

const makeHasher = (): IHasher => {
  class HasherStub {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
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
  hasherStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
}

const makeSut = (): ISutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const hasherStub = makeHasher()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    addAccountRepositoryStub,
    hasherStub,
    sut
  }
}

describe('DbAddAccount Usecase', () => {
  test('Shoud call Hasher with correct password', async () => {
    const { hasherStub, sut } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')

    const calledPassword = 'valid_password'

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: calledPassword
    }

    await sut.add(accountData)
    expect(hashSpy).toHaveBeenCalledWith(calledPassword)
  })

  test('Shoud throw if Hasher throws', async () => {
    const { hasherStub, sut } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(
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

  test('Shoud return an account on success', async () => {
    const { sut } = makeSut()

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const account = await sut.add(accountData)

    await expect(account).toEqual({
      id: 'valid_id',
      ...accountData,
      password: 'hashed_password'
    })
  })
})
