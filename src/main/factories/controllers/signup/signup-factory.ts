import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { IController } from '@/presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator'

export const makeSignUpController = (): IController => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeDbAuthentication(), makeSignUpValidation())

  return makeLogControllerDecorator(signUpController)
}
