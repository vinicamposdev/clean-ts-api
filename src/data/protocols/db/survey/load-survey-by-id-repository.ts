import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}
