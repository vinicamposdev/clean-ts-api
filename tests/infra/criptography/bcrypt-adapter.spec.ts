import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))
describe('Bcrypt Adpter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    const valueHashed = 'any_value'

    await sut.encrypt(valueHashed)
    expect(hashSpy).toHaveBeenCalledWith(valueHashed, salt)
  })

  test('Should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const valueHashed = 'any_value'

    const hash = await sut.encrypt(valueHashed)

    expect(hash).toBe('hash')
  })
})
