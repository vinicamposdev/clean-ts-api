import { ILoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { IAuthenticationModel, IAuthentication } from '@/domain/usecases/authentication'

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository
  constructor (loadAccountByEmailRepository: ILoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: IAuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
