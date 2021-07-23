/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '@/main/factories/middlewares/authentication-middleware-factory'
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { makeLoadSurveyController } from '@/main/factories/controllers/survey/load-survey /laod-survey-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveyController()))
}
