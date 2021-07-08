import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldValidation } from '@/presentation/helpers/validators'
import { IValidation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/main/adapters/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
