import { IEmailValidator } from '@/presentation/controllers/signup/signup-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface ISutTypes {
  sut: EmailValidation
  emailValidatorStub: IEmailValidator
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const validation = sut.validate({ email: 'any_email@mail.com' })

    expect(validation).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const correctEmail = 'any_email@mail.com'

    sut.validate({ email: correctEmail })

    expect(isValidSpy).toHaveBeenCalledWith(correctEmail)
  })

  test('Should throws if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
