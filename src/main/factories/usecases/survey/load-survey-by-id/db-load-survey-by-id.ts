import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { DbLoadSurveyById } from '@/data/usecases/load-survey-by-id/db-load-surveys'
import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'

export const makeDbLoadSurveyById = (): ILoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
