import jwt from 'jsonwebtoken'
import { IEncrypter } from '@/data/protocols/criptography/encrypter'

export class JwtAdapter implements IEncrypter {
  constructor (private readonly secret: string) {}

  encrypt (value: string): string {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  dencrypt (value: string): string {
    jwt.verify(value, this.secret)
    return null
  }
}
