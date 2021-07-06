import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, unauthorized } from '@/presentation/helpers/http-helpers'
import { LoginController } from '@/presentation/controllers/login/login'
import { IHttpRequest, IAuthentication, IEmailValidator } from '@/presentation/controllers/login/login-protocols'

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password'
  }
})

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAuthenticationStub = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (email: string, password: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

interface ISutTypes {
  sut: LoginController
  emailValidatorStub: IEmailValidator
  authenticationStub: IAuthentication
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(emailValidatorStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const expectedEmail = 'any_email@email.com'

    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith(expectedEmail)
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@email.com', 'any_password')
  })

  test('Should returns 401 if an invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )

    const httpRespose = await sut.handle(makeFakeRequest())
    expect(httpRespose).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
