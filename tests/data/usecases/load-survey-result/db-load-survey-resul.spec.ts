import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/tests/domain/mocks/mock-survey-results'
import { DbLoadSurveyResult } from '@/data/usecases/load-survey-result/db-load-survey-resul'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository
}

const mockLoadSurveyResultRepository = (): ILoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements ILoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  return new LoadSurveyResultRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
  return {
    sut,
    loadSurveyResultRepositoryStub
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository', async () => {
    const { loadSurveyResultRepositoryStub, sut } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')

    await sut.load('any_survey_id')

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
