import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-repository'
import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import env from '@/main/config/env'

export const makeSignUpController = (): IController => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const logMongoRepository = new LogMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, dbAuthentication, makeSignUpValidation())

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
