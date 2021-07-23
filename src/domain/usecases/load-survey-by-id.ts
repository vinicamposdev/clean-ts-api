import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}
