import { AddSurveyParams, AddSurvey, LoadSurveyById, LoadSurveys, CheckSurveyById } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModels, mockSurveyModel } from '@/../tests/domain/mocks'

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

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
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
