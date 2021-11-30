import MockDate from 'mockdate'

import { IHttpRequest } from '@/presentation/protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { mockLoadSurveyByIdRepository } from '@/tests/data/mocks'

const makeFakeRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyByIdRepository()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct values', async () => {
    const { loadSurveyByIdStub, sut } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
