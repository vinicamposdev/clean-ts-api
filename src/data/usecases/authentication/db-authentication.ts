import { IHashCompare } from '@/data/protocols/cryptography/hash-compare'
import { ITokenGenerator } from '@/data/protocols/cryptography/token-generator'
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '@/data/protocols/db/update-access-token-repository'
import { IAuthenticationModel, IAuthentication } from '@/domain/usecases/authentication'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashComparer: IHashCompare
  private readonly tokenGenerator: ITokenGenerator
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashCompare,
    tokenGenerator: ITokenGenerator,
    updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
