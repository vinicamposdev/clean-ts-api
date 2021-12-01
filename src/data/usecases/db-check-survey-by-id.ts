import { CheckSurveyById } from '@/domain/usecases'
import { CheckSurveyByIdRepository } from '@/data/protocols'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository) {}

  async checkById (id: CheckSurveyById.Params): Promise<CheckSurveyById.Result> {
    return await this.checkSurveyByIdRepository.checkById(id)
  }
}
