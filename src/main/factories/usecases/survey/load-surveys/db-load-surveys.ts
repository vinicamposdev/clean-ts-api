import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { ILoadSurveys } from '@/domain/usecases/load-surveys'
import { DbLoadSurveys } from '@/data/usecases/load-surveys/db-load-surveys'

export const makeDbLoadSurvey = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
