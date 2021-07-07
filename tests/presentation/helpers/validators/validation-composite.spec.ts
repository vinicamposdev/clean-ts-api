import { MissingParamError } from '@/presentation/errors'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { IValidation } from '@/presentation/helpers/validators/validators'

describe('Validation Composite', () => {
  test('Should returns an error if any validation fails', () => {
    class ValidationStub implements IValidation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
