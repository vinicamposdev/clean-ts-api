import jwt from 'jsonwebtoken'
import { IEncrypter } from '@/data/protocols/cryptography/encrypter'

export class JwtAdapter implements IEncrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  encrypt (value: string): string {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
