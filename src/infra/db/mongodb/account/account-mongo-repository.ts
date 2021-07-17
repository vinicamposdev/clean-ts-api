import { IAddAccountModel } from '@/domain/usecases/add-account'
import { IAccountModel } from '@/domain/models/account'
import { IAddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { IUpdateAccessTokenRepository } from '@/data/usecases/authentication/db-authentication-protocals'
export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByTokenRepository, IUpdateAccessTokenRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    const account = MongoHelper.map(result.ops[0])

    return account
  }

  async loadByEmail (email: string): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return account && MongoHelper.map(account)
  }
}
