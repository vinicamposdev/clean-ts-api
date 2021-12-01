import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols'

import faker from 'faker'
export class AddAccountRepositorySpy implements AddAccountRepository {
  addAccountParams: AddAccountRepository.Params
  result = true

  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.addAccountParams = data
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  email: string

  async loadByEmail (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  result = { id: faker.datatype.uuid() }

  accessToken: string
  role: string

  async loadByToken ({ accessToken, role }: LoadAccountByTokenRepository.Params): Promise<LoadAccountByTokenRepository.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}
