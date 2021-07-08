import { IHashCompare } from '@/data/protocols/cryptography/hash-compare'
import { ITokenGenerator } from '@/data/protocols/cryptography/token-generator'
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { IAuthenticationModel, IAuthentication } from '@/domain/usecases/authentication'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashComparer: IHashCompare
  private readonly tokenGenerator: ITokenGenerator

  constructor (
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashCompare,
    tokenGenerator: ITokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        return accessToken
      }
    }
    return null
  }
}
