import { AddAccount } from '@/domain/usecases'
import { Hasher, AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
      const isValid = newAccount !== null
      return isValid
    }
    return false
  }
}
