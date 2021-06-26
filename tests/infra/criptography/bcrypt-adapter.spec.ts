import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'

describe('Bcrypt Adpter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    const valueHashed = 'any_value'

    await sut.encrypt(valueHashed)
    expect(hashSpy).toHaveBeenCalledWith(valueHashed, salt)
  })
})
