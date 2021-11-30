import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResultParams } from '@/domain/usecases'

import faker from 'faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId:  faker.datatype.uuid(),
  surveyId:  faker.datatype.uuid(),
  answer:  faker.datatype.string(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId:  faker.datatype.uuid(),
  question:  faker.datatype.string(32),
  answers: [{
    answer:  faker.datatype.string(),
    count:  faker.datatype.number({ min: 0, max: 1000 }),
    percent:  faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer:  faker.datatype.boolean()
  }, {
    answer:  faker.datatype.string(),
    image: faker.image.imageUrl(),
    count:  faker.datatype.number({ min: 0, max: 1000 }),
    percent:  faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer:  faker.datatype.boolean()
  }],
  date: faker.date.recent()
})

export const mockEmptySurveyResultModel = (): SurveyResultModel => ({
  surveyId:  faker.datatype.uuid(),
  question:  faker.datatype.string(32),
  answers: [{
    answer:  faker.datatype.string(),
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  }, {
    answer:  faker.datatype.string(),
    image: faker.image.imageUrl(),
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  }],
  date: faker.date.recent()
})
