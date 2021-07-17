import jwt from 'jsonwebtoken'
import { IEncrypter } from '@/data/protocols/criptography/encrypter'
import { IDecrypter } from '@/data/protocols/criptography/decrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}

  encrypt (value: string): string {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  decrypt (token: string): string {
    const value: any = jwt.verify(token, this.secret)
    return value
  }
}
