import { InvalidParamError } from '@/presentation/errors'
import { IValidation } from '../../presentation/protocols/validation'

export class CompareFieldValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
