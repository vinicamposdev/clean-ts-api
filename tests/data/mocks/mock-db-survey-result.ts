import { SaveSurveyResultRepository, LoadSurveyResultRepository } from '@/data/protocols'
import { mockSurveyResultModel } from '@/../tests/domain/mocks'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  saveSurveyResultParams: SaveSurveyResultRepository.Params

  async save (data: SaveSurveyResultRepository.Params): Promise<void> {
    this.saveSurveyResultParams = data
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyResultModel = mockSurveyResultModel()
  surveyId: string
  accountId: string

  async loadBySurveyId ({ surveyId, accountId }: LoadSurveyResultRepository.Params): Promise<LoadSurveyResultRepository.Result> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.surveyResultModel
  }
}
