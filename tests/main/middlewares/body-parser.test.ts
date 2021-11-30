import app from '@/main/config/app'

import request from 'supertest'

import faker from 'faker'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    const name = faker.name.firstName()
    await request(app)
      .post('/test_body_parser')
      .send({ name })
      .expect({ name })
  })
})
