
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { DbAddSurvey } from '@/data/usecases/add-survey/db-add-survey'
import { IAddSurvey } from '@/domain/usecases/add-survey'

export const makeDbAddSurvey = (): IAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
