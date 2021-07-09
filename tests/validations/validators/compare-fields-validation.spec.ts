import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldValidation } from '@/validation/validators/compare-field-validation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_values' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return a MissingParamError if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
