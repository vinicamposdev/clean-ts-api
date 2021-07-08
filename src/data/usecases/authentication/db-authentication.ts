import { IHashCompare } from '@/data/protocols/cryptography/hash-compare'
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { IAuthenticationModel, IAuthentication } from '@/domain/usecases/authentication'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository
  private readonly hashComparer

  constructor (loadAccountByEmailRepository: ILoadAccountByEmailRepository, hashComparer: IHashCompare) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
  }

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      this.hashComparer.compare(authentication.password, account.password)
    }
    return null
  }
}
