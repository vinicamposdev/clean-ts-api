import { SignUpController } from '@/presentation/controllers'

describe('Signup Controller', () => {
  test('Should return 400 if no name es provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_mame',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
