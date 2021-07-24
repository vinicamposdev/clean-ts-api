import { SurveyModel } from '@/domain/models/survey'
import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: ILoadSurveyById
  ) {}

  async loadById (id: string): Promise<SurveyModel> {
    return await this.loadSurveyByIdRepository.loadById(id)
  }
}
