import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { IAccountModel } from '@/domain/models/account'
import { ILoadAccountByToken } from '@/domain/usecases/load-account-by-token'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: IDecrypter
  ) {}

  async load (accessToken: string, role?: string): Promise<IAccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
