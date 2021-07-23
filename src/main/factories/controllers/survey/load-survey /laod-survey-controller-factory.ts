import { IController } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeDbLoadSurvey } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveyController = (): IController => {
  const surveyController = new LoadSurveysController(makeDbLoadSurvey())
  return makeLogControllerDecorator(surveyController)
}
