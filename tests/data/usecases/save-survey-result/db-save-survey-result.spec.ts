import MockDate from 'mockdate'

import { DbSaveSurveyResult } from '@/data/usecases/save-survey-result/db-save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/save-survey-result'
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

const mockSurveyResult = (): SurveyResultModel => ({
  accountId: 'any_account_id',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 60,
    image: 'any_image'
  }, {
    answer: 'other_answer',
    count: 10,
    percent: 40
  }],
  date: new Date(),
  surveyId: 'any_survey_id'
})

const makeSaveSurveyResultRepositorySutb = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositorySutb implements ISaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {
      await new Promise(resolve => resolve(mockSurveyResult()))
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

  // test('Should return a survey on success', async () => {
  //   const { sut } = makeSut()
  //   const surveys = await sut.save(makeFakeSurveyResultData())
  //   expect(surveys).toEqual(mockSurveyResult())
  // })
})
