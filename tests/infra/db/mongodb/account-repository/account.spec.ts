import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should reutrn an acoount on success', async () => {
    const sut = makeSut()

    const newAccount = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const account = await sut.add(newAccount)

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(newAccount.name)
    expect(account.email).toBe(newAccount.email)
    expect(account.password).toBe(newAccount.password)
  })
})
