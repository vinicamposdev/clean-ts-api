import bcrypt from 'bcrypt'

import { IHasher } from '@/data/protocols/cryptography/hasher'

export class BcryptAdapter implements IHasher {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
