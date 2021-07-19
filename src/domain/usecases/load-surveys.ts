import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveys {
  load: () => Promise<SurveyModel[]>
}
