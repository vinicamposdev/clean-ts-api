import { makeSignUpValidation } from '@/main/factories/signup-validation'
import { CompareFieldValidation } from '@/presentation/helpers/validators/compare-field-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/require-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { IValidation } from '@/presentation/helpers/validators/validators'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeSignUpValidation()
    const validations: IValidation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
