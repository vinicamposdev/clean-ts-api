import { IAccountModel } from '@/domain/models/account'

export interface ILoadAccountByEmailRepository {
  load: (email: string) => Promise<IAccountModel>
}
