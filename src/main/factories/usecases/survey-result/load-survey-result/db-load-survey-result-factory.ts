import { ILoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { DbLoadSurveyResult } from '@/data/usecases/load-survey-result/db-load-survey-resul'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'

export const makeDbLoadSurveyResult = (): ILoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
