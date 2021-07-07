import { InvalidParamError } from '@/presentation/errors'
import { IEmailValidator } from '@/presentation/protocols/email-validator'
import { IValidation } from '../../protocols/validation'

export class EmailValidation implements IValidation {
  private readonly fieldName: string
  private readonly emailValidator: IEmailValidator

  constructor (fieldName: string, emailValidator: IEmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
