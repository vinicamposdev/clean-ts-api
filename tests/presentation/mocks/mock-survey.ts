import { AddSurveyParams, AddSurvey, LoadSurveys, CheckSurveyById, LoadAnswersBySurvey } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModels } from '@/../tests/domain/mocks'

import faker from 'faker'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveyModels
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  result: string[] = [
    faker.datatype.string(),
    faker.datatype.string()
  ]

  id: string

  async loadAnswers (id: LoadAnswersBySurvey.Params): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  result = true
  id: string

  async checkById (id: CheckSurveyById.Params): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}
