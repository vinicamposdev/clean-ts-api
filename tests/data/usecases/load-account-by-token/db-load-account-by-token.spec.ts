import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token'

const makeDecrypterStub = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

interface ISutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
}

const makeSut = (): ISutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)

  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')

    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
