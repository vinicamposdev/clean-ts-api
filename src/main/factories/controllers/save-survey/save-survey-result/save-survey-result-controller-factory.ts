import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { IController } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): IController => {
  const surveyController = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(surveyController)
}
