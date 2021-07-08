import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('Auth Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'valid_password',
          passwordConfirmation: 'valid_password'
        })
        .expect(200)
    })
  })
})
