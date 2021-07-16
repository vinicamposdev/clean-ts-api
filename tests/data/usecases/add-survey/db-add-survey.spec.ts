import { DbAddSurvey } from '@/data/usecases/add-survey/db-add-survey'
import { IAddSurveyModel, IAddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveyData = (): IAddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey UseCase', () => {
  test('Sould call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositorySutb implements IAddSurveyRepository {
      async add (data: IAddSurveyModel): Promise<void> {
        return await new Promise(resolve => resolve())
      }
    }

    const addSurveyRepositorySutb = new AddSurveyRepositorySutb()
    const addSpy = jest.spyOn(addSurveyRepositorySutb, 'add')
    const sut = new DbAddSurvey(addSurveyRepositorySutb)
    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
