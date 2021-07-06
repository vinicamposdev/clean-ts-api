import { IValidation } from './validators'

export class ValidationComposite implements IValidation {
  private readonly validations
  constructor (validations: IValidation[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
