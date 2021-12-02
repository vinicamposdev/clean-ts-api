import { SurveyModel } from '@/domain/models'
import { AddSurvey } from '@/domain/usecases'

import faker from 'faker'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.datatype.uuid(),
    question: faker.datatype.string(32),
    answers: [{
      answer: faker.datatype.string()
    }, {
      answer: faker.datatype.string(),
      image: faker.image.imageUrl()
    }],
    date: faker.date.recent()
  }
}

export const mockSurveyModels = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel()
]

export const mockAddSurveyParams = (): AddSurvey.Params => ({
  question: faker.datatype.string(32),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.datatype.string()
  }, {
    answer: faker.datatype.string()
  }],
  date: faker.date.recent()
})
