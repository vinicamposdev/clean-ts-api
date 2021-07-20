import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
