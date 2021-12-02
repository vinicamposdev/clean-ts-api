import { RequiredFieldValidation } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'

import faker from 'faker'

const field =  faker.datatype.string()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField:  faker.datatype.string() })
    expect(error).toEqual(new MissingParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]:  faker.datatype.string() })
    expect(error).toBeFalsy()
  })
})
