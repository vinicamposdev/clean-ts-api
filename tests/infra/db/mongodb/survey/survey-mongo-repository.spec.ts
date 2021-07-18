import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { Collection } from 'mongodb'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should add a new survey on add success', async () => {
    const sut = makeSut()

    await sut.add({
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }, {
        answer: 'any_other_answer'
      }],
      date: new Date()
    })

    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
