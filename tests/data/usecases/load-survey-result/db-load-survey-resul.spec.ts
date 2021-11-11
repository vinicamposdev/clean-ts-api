import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { DbLoadSurveyResult } from '@/data/usecases/load-survey-result/db-load-survey-resul'
import { mockLoadSurveyResultRepository } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository
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
