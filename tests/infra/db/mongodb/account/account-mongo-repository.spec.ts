import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { Collection } from 'mongodb'
import { IAccountModel } from '@/domain/models/account'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should return an acoount on add success', async () => {
      const sut = makeSut()

      const newAccount: Omit<IAccountModel, 'id'> = {
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

  describe('loadByEmail()', () => {
    test('Should return an acoount on loadByEmail success', async () => {
      const sut = makeSut()

      const newAccount = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
      await accountCollection.insertOne(newAccount)

      const account = await sut.loadByEmail(newAccount.email)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(newAccount.name)
      expect(account.email).toBe(newAccount.email)
      expect(account.password).toBe(newAccount.password)
    })

    test('Should return null on loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()

      const newAccount = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
      const res = await accountCollection.insertOne(newAccount)
      const fakeAccount = res.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()

      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
    })
  })

  describe('loadByToken()', () => {
    test('Should return an acoount without role', async () => {
      const sut = makeSut()

      const newAccount = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      }
      await accountCollection.insertOne(newAccount)

      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(newAccount.name)
      expect(account.email).toBe(newAccount.email)
      expect(account.password).toBe(newAccount.password)
    })

    test('Should return an acoount with role', async () => {
      const sut = makeSut()

      const newAccount = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'any_role'
      }
      await accountCollection.insertOne(newAccount)

      const account = await sut.loadByToken('any_token', 'any_role')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(newAccount.name)
      expect(account.email).toBe(newAccount.email)
      expect(account.password).toBe(newAccount.password)
    })

    test('Should return null on loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
