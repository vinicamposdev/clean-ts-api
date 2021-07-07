import { SignUpController } from '@/presentation/controllers/signup'
import { IAccountModel, IAddAccountModel, IAddAccount } from '@/presentation/controllers/signup/signup-protocols'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helpers'
import { IValidation } from '@/presentation/protocols/validation'

const makeAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (add: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }

      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface ISutTypes {
  sut: SignUpController
  addAccountStub: IAddAccount
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('Signup Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    const correctValues = {
      name: 'any_mame',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const httpRequest = {
      body: {
        ...correctValues,
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(correctValues)
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementation(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {
        name: 'any_mame',
        email: 'invalid_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if a valid data is provided', async () => {
    const { sut } = makeSut()

    const validData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const httpRequest = {
      body: {
        ...validData,
        passwordConfirmation: 'valid_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ ...validData, id: 'valid_id' })
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = {
      body: {
        name: 'any_mame',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should returns 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValue(new MissingParamError('any_field'))

    const httpRequest = {
      body: {
        name: 'any_mame',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
