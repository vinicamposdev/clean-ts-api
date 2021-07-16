import { IAddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { IAddSurveyModel } from '@/domain/usecases/add-survey'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class SurveyMongoRepository implements IAddSurveyRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
