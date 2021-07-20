import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { DbLoadSurveys } from '@/data/usecases/load-surveys/db-load-surveys'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }]
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveyRepository', async () => {
    class LoadSurveyRepositoryStub implements ILoadSurveysRepository {
      async loadAll (): Promise<SurveyModel[]> {
        return await new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveyRepositoryStub()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
