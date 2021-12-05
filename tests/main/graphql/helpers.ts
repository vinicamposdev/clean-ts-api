import { MongoHelper } from '@/infra/db'
import env from '@/main/config/env'

import faker from 'faker'
import { sign } from 'jsonwebtoken'

export const name = faker.name.findName()
export const email = faker.internet.email()
export const password = faker.internet.password()

export const mockAccessToken = async (): Promise<string> => {
  const accountCollection = MongoHelper.getCollection('accounts')
  const res = await accountCollection.insertOne({
    name,
    email,
    password,
    role: 'admin'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}
