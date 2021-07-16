import { IAddSurveyModel } from '@/domain/usecases/add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
