import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return a token on sign success', () => {
    const sut = new JwtAdapter('secret')
    const accessToken = sut.encrypt('any_id')

    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(
      () => {
        return new Error()
      }
    )
    const promise = sut.encrypt('any_id')

    expect(promise).toEqual(new Error())
  })
})
