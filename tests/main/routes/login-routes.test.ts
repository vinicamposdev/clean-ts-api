import { setupApp } from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'
import faker from 'faker'
import { Express } from 'express'

let accountCollection: Collection
let app: Express

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      const password = faker.internet.password()
      const data = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password,
        passwordConfirmation: password
      }

      await request(app)
        .post('/api/signup')
        .send(data)
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send(data)
        .expect(403)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = faker.internet.password()
      const hashedPassword = await hash(password, 12)
      const email = faker.internet.email()

      await accountCollection.insertOne({
        name: faker.name.firstName(),
        email,
        password: hashedPassword
      })
      await request(app)
        .post('/api/login')
        .send({
          email,
          password
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      const email = faker.internet.email()
      const password = faker.internet.password()

      await request(app)
        .post('/api/login')
        .send({
          email,
          password
        })
        .expect(401)
    })
  })
})
