import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      sut.encrypt('any_id')

      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token on sign success', () => {
      const sut = makeSut()
      const accessToken = sut.encrypt('any_id')

      expect(accessToken).toBe('any_token')
    })

    test('Should throw if sign throws', () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(
        () => {
          return new Error()
        }
      )
      const promise = sut.encrypt('any_id')

      expect(promise).toEqual(new Error())
    })
  })
})
