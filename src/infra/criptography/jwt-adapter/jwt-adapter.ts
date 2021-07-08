import jwt from 'jsonwebtoken'
import { IEncrypter } from '@/data/protocols/cryptography/encrypter'

export class JwtAdapter implements IEncrypter {
  constructor (private readonly secret: string) {}

  encrypt (value: string): string {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
