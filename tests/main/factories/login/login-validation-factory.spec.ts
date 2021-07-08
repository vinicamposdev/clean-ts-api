import { makeLoginValidation } from '@/main/factories/login/login-validation-factory'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/presentation/helpers/validators'
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

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeLoginValidation()
    const validations: IValidation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
