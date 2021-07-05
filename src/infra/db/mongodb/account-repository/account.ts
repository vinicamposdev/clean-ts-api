import { IAddAccountModel } from '@/domain/usecases/add-account'
import { IAccountModel } from '@/domain/models/account'
import { IAddAccountRepository } from '@/data/protocols/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'
export class AccountMongoRepository implements IAddAccountRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    const account = MongoHelper.map(result.ops[0])

    return account
  }
}
