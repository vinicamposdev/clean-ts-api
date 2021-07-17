import jwt from 'jsonwebtoken'
import { IEncrypter } from '@/data/protocols/criptography/encrypter'
import { IDecrypter } from '@/data/protocols/criptography/decrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}

  encrypt (value: string): string {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  decrypt (value: string): string {
    jwt.verify(value, this.secret)
    return null
  }
}
