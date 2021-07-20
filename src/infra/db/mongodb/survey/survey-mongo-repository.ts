import { IAddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { IAddSurveyModel } from '@/domain/usecases/add-survey'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    return await surveyCollection.find().toArray()
  }
}
