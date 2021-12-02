import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/../tests/data/mocks'
import { throwError } from '@/../tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

let accessToken: string
let role: string

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    accessToken = faker.datatype.uuid()
    role = faker.datatype.string()
  })

  test('Should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load({ accessToken, role })
    expect(decrypterSpy.ciphertext).toBe(accessToken)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.load({ accessToken, role })
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load({ accessToken, role })
    expect(loadAccountByTokenRepositorySpy.accessToken).toBe(accessToken)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const account = await sut.load({ accessToken, role })
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load({ accessToken, role })
    expect(account).toEqual(loadAccountByTokenRepositorySpy.result)
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const account = await sut.load({ accessToken, role })
    await expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load({ accessToken, role })
    await expect(promise).rejects.toThrow()
  })
})
