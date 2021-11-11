import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { mockSurveyResultModel } from '@/tests/domain/mocks/mock-survey-results'
import { SurveyResultModel } from '@/domain/models/survey-result'

export const mockLoadSurveyResultRepository = (): ILoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements ILoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  return new LoadSurveyResultRepositoryStub()
}
