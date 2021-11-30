import MockDate from 'mockdate'

import { DbSaveSurveyResult } from '@/data/usecases/save-survey-result/db-save-survey-result'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { mockSurveyResultModel } from '@/tests/domain/mocks/mock-survey-results'

const makeFakeSurveyResultData = (): SaveSurveyResult.Params => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

const makeSaveSurveyResultRepositorySutb = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositorySutb implements ISaveSurveyResultRepository {
    async save (data: SaveSurveyResult.Params): Promise<void> {
      await new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultRepositorySutb()
}

type ISutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}

const makeSut = (): ISutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositorySutb()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeFakeSurveyResultData())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultData())
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.save(makeFakeSurveyResultData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a survey on success', async () => {
    const { sut } = makeSut()

    const promise = sut.save(makeFakeSurveyResultData())

    await expect(promise).toEqual(mockSurveyResultModel())
  })
})
