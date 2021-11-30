import { Router, Express } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.includes('.test.') && !file.endsWith('.map') && !file.includes('.spec.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
