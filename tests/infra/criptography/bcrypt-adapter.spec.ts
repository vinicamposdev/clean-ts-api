/* eslint-disable promise/param-names */
import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}
describe('Bcrypt Adpter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    const valueHashed = 'any_value'

    await sut.hash(valueHashed)
    expect(hashSpy).toHaveBeenCalledWith(valueHashed, salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()

    const valueHashed = 'any_value'

    const hash = await sut.hash(valueHashed)

    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => {
      return await new Promise((_resolve, reject) => reject(new Error()))
    })
    const valueHashed = 'any_value'

    const promise = sut.hash(valueHashed)

    await expect(promise).rejects.toThrow()
  })
})
