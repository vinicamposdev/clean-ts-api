import { makeSignUpValidation } from '@/main/factories/signup/signup-validation'
import { CompareFieldValidation } from '@/presentation/helpers/validators/compare-field-validation'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/require-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { IValidation } from '@/presentation/protocols/validation'
import { IEmailValidator } from '@/presentation/protocols/email-validator'

jest.mock('@/presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeSignUpValidation()
    const validations: IValidation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
