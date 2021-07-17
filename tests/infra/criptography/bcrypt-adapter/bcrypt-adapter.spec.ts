/* eslint-disable promise/param-names */
import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  },
  async compare (value: string, hash: string): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}
describe('Bcrypt Adpter', () => {
  describe('hash()', () => {
    test('Should call hash with correct value', async () => {
      const sut = makeSut()

      const hashSpy = jest.spyOn(bcrypt, 'hash')

      const valueHashed = 'any_value'

      await sut.hash(valueHashed)
      expect(hashSpy).toHaveBeenCalledWith(valueHashed, salt)
    })

    test('Should return a valid hash on hash success', async () => {
      const sut = makeSut()

      const valueHashed = 'any_value'

      const hash = await sut.hash(valueHashed)

      expect(hash).toBe('hash')
    })

    test('Should throw if hash throws', async () => {
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

  describe('compare()', () => {
    test('Should call compare with correct value', async () => {
      const sut = makeSut()

      const compareSpy = jest.spyOn(bcrypt, 'compare')

      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should return true when compare succeds', async () => {
      const sut = makeSut()

      const isValid = await sut.compare('any_value', 'any_hash')

      expect(isValid).toBe(true)
    })

    test('Should return false when compare fails', async () => {
      const sut = makeSut()

      // jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(
      //   new Promise(resolve => resolve(false))
      // )

      const isValid = await sut.compare('any_value', 'any_hash')

      expect(isValid).toBe(!false)
    })

    test('Should throw if compare throws', async () => {
      const sut = makeSut()

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
        return await new Promise((_resolve, reject) => reject(new Error()))
      })

      const promise = sut.compare('any_value', 'any_hash')

      await expect(promise).rejects.toThrow()
    })
  })
})
