import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication-middleware-protocols'
import { IMiddleware } from '@/presentation/protocols'
import { makeDbLoadAccountByToken } from '../usecases/account/load-account-by-token/load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  return new AuthenticationMiddleware(makeDbLoadAccountByToken(), role)
}
