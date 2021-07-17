import { IAccountModel } from '../models/account'
export type IAddAccountModel = {
  name: string
  email: string
  password: string
}

export interface IAddAccount {
  add: (account: IAddAccountModel) => Promise<IAccountModel>
}
