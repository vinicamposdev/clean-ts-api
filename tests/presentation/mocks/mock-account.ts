import { AddAccount, Authentication, LoadAccountByToken } from '@/domain/usecases'
import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccount.Params
  result = true

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  result = { id: faker.datatype.uuid() }
  accessToken: string
  role: string

  async load ({ accessToken, role }: LoadAccountByToken.Params): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
