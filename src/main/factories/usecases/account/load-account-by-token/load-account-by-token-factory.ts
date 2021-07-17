
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { ILoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'
import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token'

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
